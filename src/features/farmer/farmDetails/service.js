import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/account';

// ── CREATE DEDICATED AXIOS INSTANCE ──────────────────────────────────────────
// Yeh instance automatically har request ke sath auth token attach kar dega
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    // Login ke time save kiye gaye 'access_token' ko dono storage se check karega
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Map Sustainability checkboxes array to Boolean flags
const mapSustainabilityToPayload = (practices = [], otherPractice = '') => {
  return {
    has_organic_farming: practices.includes('Organic Farming'),
    has_crop_rotation: practices.includes('Crop Rotation'),
    has_natural_fertilizers: practices.includes('Natural Fertilizers'),
    has_water_conservation: practices.includes('Water Conservation'),
    has_soil_health_management: practices.includes('Soil Health Management'),
    has_integrated_pest_management: practices.includes('Integrated Pest Management'),
    has_agroforestry: practices.includes('Agroforestry'),
    other_sustainability_practice: practices.includes('Other (Please specify)') ? otherPractice : '',
  };
};

// ── GET FARM DETAILS ────────────────────────────────────────────────────────
export const getFarmDetails = async () => {
  try {
    const response = await apiClient.get('/farmer/farm-details/');
    const data = response.data;

    // Reconstruct sustainability array for frontend checkboxes
    const sustainabilityPractices = [];
    if (data.has_organic_farming) sustainabilityPractices.push('Organic Farming');
    if (data.has_crop_rotation) sustainabilityPractices.push('Crop Rotation');
    if (data.has_natural_fertilizers) sustainabilityPractices.push('Natural Fertilizers');
    if (data.has_water_conservation) sustainabilityPractices.push('Water Conservation');
    if (data.has_soil_health_management) sustainabilityPractices.push('Soil Health Management');
    if (data.has_integrated_pest_management) sustainabilityPractices.push('Integrated Pest Management');
    if (data.has_agroforestry) sustainabilityPractices.push('Agroforestry');
    if (data.other_sustainability_practice) sustainabilityPractices.push('Other (Please specify)');

    return {
      farmName: data.farm_name || '',
      farmOwner: data.farm_owner || '',
      village: data.village || '',
      district: data.district || '',
      state: data.state || '',
      pinCode: data.pin_code || '',
      location: {
        address: data.farm_location_address || '',
        latitude: data.latitude || '',
        longitude: data.longitude || '',
      },
      totalArea: data.total_farm_area || '',
      areaUnit: data.area_unit || 'Acres',
      soilType: data.soil_type || '',
      farmingMethod: data.farming_method || '',
      irrigationType: data.irrigation_type || '',
      waterSource: data.water_source || '',
      crops: data.main_crops_grown || [],
      photos: data.photos || [],
      sustainabilityPractices,
      otherPractice: data.other_sustainability_practice || '',
    };
  } catch (error) {
    console.error('Error fetching farm details:', error.response?.data || error.message);
    throw error;
  }
};

// ── BUILD FORM DATA HELPER ──────────────────────────────────────────────────
const buildFarmFormData = (farm, isDraft) => {
  const formData = new FormData();
  formData.append('farm_name', farm.farmName || '');
  formData.append('farm_owner', farm.farmOwner || '');
  formData.append('village', farm.village || '');
  formData.append('district', farm.district || '');
  formData.append('state', farm.state || '');
  formData.append('pin_code', farm.pinCode || '');
  formData.append('farm_location_address', farm.location?.address || '');
  formData.append('latitude', farm.location?.latitude || '');
  formData.append('longitude', farm.location?.longitude || '');
  formData.append('total_farm_area', farm.totalArea || '');
  formData.append('area_unit', farm.areaUnit || 'Acres');
  formData.append('soil_type', farm.soilType || '');
  formData.append('farming_method', farm.farmingMethod || '');
  formData.append('irrigation_type', farm.irrigationType || '');
  formData.append('water_source', farm.waterSource || '');
  formData.append('main_crops_grown', JSON.stringify(farm.crops || []));
  formData.append('is_draft', isDraft);

  // Sustainability fields mapping
  const sustainability = mapSustainabilityToPayload(farm.sustainabilityPractices, farm.otherPractice);
  Object.keys(sustainability).forEach((key) => {
    formData.append(key, sustainability[key]);
  });

  return formData;
};

// ── SAVE FARM DRAFT ────────────────────────────────────────────────────────
export const saveFarmDraft = async (farm) => {
  try {
    const formData = buildFarmFormData(farm, true);
    const response = await apiClient.post('/farmer/farm-details/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving farm draft:', error.response?.data || error.message);
    throw error;
  }
};

// ── UPDATE FARM DETAILS ────────────────────────────────────────────────────
export const updateFarmDetails = async (farm) => {
  try {
    const formData = buildFarmFormData(farm, false);
    const response = await apiClient.post('/farmer/farm-details/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating farm details:', error.response?.data || error.message);
    throw error;
  }
};

// ── UPLOAD FARM PHOTOS ─────────────────────────────────────────────────────
export const uploadFarmPhotos = async (files, currentPhotoCount, onProgress) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('uploaded_photos', file);
    });

    const response = await apiClient.post('/farmer/farm-details/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percent);
      },
    });
    return response.data.data?.photos || [];
  } catch (error) {
    console.error('Error uploading farm photos:', error.response?.data || error.message);
    throw error;
  }
};