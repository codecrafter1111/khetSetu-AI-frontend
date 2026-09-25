import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../farmerProfile/productapi";
import {
  BarChart3, Box, Camera, CheckCircle2, ChevronRight, Eye,
  FileText, Gift, Leaf, MapPin, PackageCheck, Save, ShieldCheck,
  Star, Truck, Upload, X, Loader2, AlertCircle, Package, Tag,
  DollarSign, Percent, Layers, UploadCloud
} from "lucide-react";
import FarmerPageHero from "../components/FarmerPageHero";
import ProductImage from "../products/components/ProductImage";
import "../products/add-product.css";

const emptyForm = {
  name: "",
  brand: "",
  category: "",
  stock: 30,
  package_quantity: "",
  package_unit: "g",
  price_inr: "",
  offer: 17,
  image: null,
};

const components = [
  { icon: Camera, title: 'Product Images', text: 'Upload clear, high-quality product media' },
  { icon: FileText, title: 'Product Information', text: 'Add title, brand, category and details' },
  { icon: Gift, title: 'Pricing & Stock', text: 'Set price, discount, package size and stock' },
  { icon: ShieldCheck, title: 'Quality Information', text: 'Ensure accurate unit metrics and details' },
  { icon: Truck, title: 'Logistics Readiness', text: 'Provide package dimensions and inventory status' },
  { icon: Upload, title: 'Review & Publish', text: 'Preview your listing and publish live' },
];

function Stepper() {
  return (
    <div className="add-product-stepper">
      {['Product Details', 'Pricing & Stock', 'Quality & Logistics', 'Review & Publish'].map((label, index) => (
        <div className={index === 0 ? 'active' : ''} key={label}>
          <span>{index + 1}</span>
          <strong>{label}</strong>
          {index < 3 && <i />}
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <header className="add-section-title">
      <Icon />
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}

export default function FarmerAddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state?.editProduct || null;

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name || "",
        brand: editProduct.brand || "",
        category: editProduct.category?.id || editProduct.category || "",
        stock: editProduct.stock ?? 30,
        package_quantity: editProduct.package_quantity || "",
        package_unit: editProduct.package_unit || "g",
        price_inr: editProduct.price_inr || "",
        offer: editProduct.offer ?? 17,
        image: null,
      });
      setImagePreview(editProduct.image || null);
    } else {
      setForm(emptyForm);
      setImagePreview(null);
    }
  }, [editProduct]);

  const loadCategory = async () => {
    try {
      const res = await api.get("categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const change = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const flash = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const handlePreview = () => {
    setHighlight(true);
    flash("Live preview updated");
    window.setTimeout(() => setHighlight(false), 1200);
  };

  const handleDraft = () => {
    localStorage.setItem("khetsetu-product-draft", JSON.stringify(form));
    flash("Product saved as draft successfully");
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(form).forEach((k) => {
        if (form[k] !== null && form[k] !== "") {
          data.append(k, form[k]);
        }
      });

      if (editProduct) {
        await api.patch(`products/management/${editProduct.uuid}/`, data);
        flash("Product updated successfully!");
      } else {
        await api.post("products/management/", data);
        flash("Product published successfully!");
      }

      window.setTimeout(() => navigate("/farmer/products"), 1000);
    } catch (err) {
      console.error("Error saving product:", err);
      const errorMsg = err.response?.data?.message || "Failed to save product. Please check your fields.";
      setError(errorMsg);
      flash(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FarmerPageHero 
        title={editProduct ? "Edit Product" : "Add New Product"} 
        subtitle="List your fresh farm produce for sale and reach more buyers." 
        icon={Leaf} 
        iconPlacement="end" 
      />
      <div className="add-product-page">
        <Stepper />
        <div className="add-product-layout">
          
          {/* Main Form Section */}
          <div className="add-product-form bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editProduct ? "Edit Product Details" : "Product Details"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {editProduct ? "Update existing product details." : "Fill out the details to list a new item."}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Title <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={change}
                    placeholder="e.g. Organic Almond Milk"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Brand & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
                  <div className="relative">
                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="brand"
                      value={form.brand}
                      onChange={change}
                      placeholder="Brand Name"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    name="category"
                    value={form.category}
                    onChange={change}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all text-slate-700"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="number"
                      name="price_inr"
                      value={form.price_inr}
                      onChange={change}
                      placeholder="0.00"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount (%)</label>
                  <div className="relative">
                    <Percent size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      name="offer"
                      value={form.offer}
                      onChange={change}
                      placeholder="17"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity & Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pkg Size</label>
                  <input
                    type="number"
                    name="package_quantity"
                    value={form.package_quantity}
                    onChange={change}
                    placeholder="500"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
                  <select
                    name="package_unit"
                    value={form.package_unit}
                    onChange={change}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all text-slate-700"
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                    <option value="pcs">pcs</option>
                  </select>
                </div>
              </div>

              {/* Stock Inventory */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Available Stock
                </label>
                <div className="relative">
                  <Layers size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={change}
                    placeholder="30"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Media
                </label>

                {imagePreview ? (
                  <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                      />
                      <span className="text-xs font-medium text-slate-600 truncate max-w-[150px]">
                        {form.image?.name || "Product Image"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 transition-all">
                    <UploadCloud size={24} className="text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">Click to upload image</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={change}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 flex items-center gap-2 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={handleDraft}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Save size={15} /> Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Eye size={15} /> Preview
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>{editProduct ? "Update Product" : "Publish Product"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Rail Panel (Preview & Insights) */}
          <aside className="add-product-rail">
            <section className={`add-rail-panel live-preview ${highlight ? 'highlight' : ''}`}>
              <header>
                <h2><Eye />Product Preview</h2>
              </header>
              <article className="p-4 bg-white rounded-xl border border-slate-100">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                  <ProductImage product={{ name: form.name || 'Product Title', image: 'wheat' }} className="preview-placeholder" />
                )}
                <div className="mt-3">
                  <h3 className="font-bold text-sm text-slate-900">{form.name || 'Product Title'}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Brand: {form.brand || 'N/A'}</p>
                  <strong className="text-emerald-600 text-sm block mt-2">₹ {form.price_inr || '0.00'}</strong>
                  <small className="text-xs text-slate-400 block mt-1"><Box /> Stock: {form.stock} units</small>
                </div>
              </article>
            </section>

            <section className="add-rail-panel add-pricing-insight">
              <header>
                <h2><BarChart3 />Pricing Insights (AI)</h2>
              </header>
              <div className="p-4 bg-white rounded-xl border border-slate-100">
                <small className="text-xs text-slate-500">Similar items average market price</small>
                <strong className="text-sm font-bold block mt-1">₹ 150 – ₹ 500</strong>
                <span className="text-xs text-emerald-600 font-medium block mt-1">↗ Good competitive range</span>
              </div>
            </section>

            <section className="add-rail-panel important-components">
              <header>
                <h2><Star />Guidelines</h2>
              </header>
              <div className="p-3 bg-white rounded-xl border border-slate-100 space-y-2">
                {components.map(({ icon: Icon, title, text }) => (
                  <article key={title} className="flex items-start gap-2.5 text-xs">
                    <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Icon size={14} /></span>
                    <div>
                      <strong className="block text-slate-800">{title}</strong>
                      <small className="text-slate-400">{text}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>

        </div>
      </div>
      {toast && (
        <div className="add-product-toast">
          <CheckCircle2 /> {toast}
        </div>
      )}
    </>
  );
}