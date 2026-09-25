import { useState } from "react";
import axios from "axios";
import {
  LockKeyhole,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../config/routes";
import AuthCard from "../components/AuthCard";
import AuthField from "../components/AuthField";
import RoleSelect from "../components/RoleSelect";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (event) => {
    const { name, value, checked, type } = event.target;

    const normalized =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : normalized,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    const next = {};

    if (!form.username.trim()) next.username = "Username is required.";

    if (!emailPattern.test(form.email)) next.email = "Enter valid email.";

    if (form.phone.length !== 10)
      next.phone = "Enter valid 10 digit phone.";

    if (form.password.length < 8) next.password = "Minimum 8 characters.";

    if (form.confirmPassword !== form.password)
      next.confirmPassword = "Passwords do not match.";

    if (!form.role) next.role = "Select your role.";

    if (!form.terms) next.terms = "Accept Terms & Privacy Policy.";

    setErrors((prev) => ({ ...prev, ...next }));

    if (Object.keys(next).length > 0) return;

    setSubmitting(true);

    try {
      const payload = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirm_password: form.confirmPassword,
        role: form.role,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/account/Account/Registration/",
        payload
      );

      console.log(response.data);

      navigate(routes.auth.login, {
        replace: true,
        state: {
          created: true,
          email: form.email,
        },
      });
    } catch (error) {
      if (error.response?.data) {
        const backendErrors = {};

        Object.keys(error.response.data).forEach((key) => {
          const value = error.response.data[key];
          backendErrors[key] = Array.isArray(value) ? value[0] : value;
        });

        setErrors((prev) => ({ ...prev, ...backendErrors }));
      } else {
        alert("Server not responding");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Join the trusted farm-to-city ecosystem."
      alternateText="Already have an account?"
      alternateLabel="Sign In"
      alternateTo={routes.auth.login}
    >
      <form
        className="auth-form auth-form--signup"
        onSubmit={submit}
        noValidate
      >
        <AuthField
          icon={User}
          name="username"
          value={form.username}
          onChange={update}
          placeholder="Username"
          autoComplete="username"
          error={errors.username}
        />

        <AuthField
          icon={Mail}
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          placeholder="Email Address"
          autoComplete="email"
          error={errors.email}
        />

        <AuthField
          icon={Phone}
          name="phone"
          type="tel"
          inputMode="numeric"
          value={form.phone}
          onChange={update}
          placeholder="9876543210"
          autoComplete="tel"
          error={errors.phone}
          prefix={<span className="auth-field__prefix">+91</span>}
        />

        <AuthField
          icon={LockKeyhole}
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={update}
          placeholder="Password"
          autoComplete="new-password"
          error={errors.password}
          onToggle={() => setShowPassword(!showPassword)}
          toggleLabel={showPassword ? "Hide password" : "Show password"}
        />

        <AuthField
          icon={LockKeyhole}
          name="confirmPassword"
          type={showConfirmation ? "text" : "password"}
          value={form.confirmPassword}
          onChange={update}
          placeholder="Confirm Password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          onToggle={() => setShowConfirmation(!showConfirmation)}
          toggleLabel={
            showConfirmation ? "Hide password" : "Show password"
          }
        />

        <RoleSelect value={form.role} onChange={update} error={errors.role} />

        <label className="auth-check auth-check--terms">
          <input
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={update}
          />
          <span />
          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

        {errors.terms && (
          <span className="auth-field__error" role="alert">
            {errors.terms}
          </span>
        )}

        <button className="auth-submit" type="submit" disabled={submitting}>
          <UserPlus size={18} />
          {submitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </AuthCard>
  );
}