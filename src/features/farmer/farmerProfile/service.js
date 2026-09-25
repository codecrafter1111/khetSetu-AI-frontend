import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/account';

// ── CREATE DEDICATED AXIOS INSTANCE WITH INTERCEPTOR ────────────────────────
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    // ✅ FIX: 'token' ki jagah sahi key 'access_token' check karega (localStorage & sessionStorage dono)
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── GET FARMER PROFILE ──────────────────────────────────────────────────────
export const getFarmerProfile = async () => {
  try {
    const response = await apiClient.get('/farmer/profile/');
    const data = response.data;
    
    // DRF Response (snake_case) -> Frontend State (camelCase)
    return {
      fullName: data.full_name || '',
      mobileNumber: data.mobile_number || '',
      email: data.email_address || '',
      preferredLanguage: data.preferred_language || '',
      state: data.state || '',
      district: data.district || '',
      village: data.village || '',
      farmingExperience: data.farming_experience || '',
      shortBio: data.short_bio || '',
      profileImage: data.profile_image || '',
      isVerified: data.is_verified || false,
      rejectionReason: data.rejection_reason || '',
    };
  } catch (error) {
    console.error('Error fetching farmer profile:', error.response?.data || error.message);
    throw error;
  }
};

// ── SAVE PROFILE DRAFT ──────────────────────────────────────────────────────
export const saveProfileDraft = async (profile) => {
  try {
    const payload = {
      full_name: profile.fullName || '',
      mobile_number: profile.mobileNumber || '',
      email_address: profile.email || '',
      preferred_language: profile.preferredLanguage || '',
      state: profile.state || '',
      district: profile.district || '',
      village: profile.village || '',
      farming_experience: profile.farmingExperience || '',
      short_bio: profile.shortBio || '',
      is_draft: true,
    };

    const response = await apiClient.post('/farmer/profile/', payload);
    return response.data;
  } catch (error) {
    console.error('Error saving profile draft:', error.response?.data || error.message);
    throw error;
  }
};

// ── UPDATE FARMER PROFILE ───────────────────────────────────────────────────
export const updateFarmerProfile = async (profile) => {
  try {
    const payload = {
      full_name: profile.fullName || '',
      mobile_number: profile.mobileNumber || '',
      email_address: profile.email || '',
      preferred_language: profile.preferredLanguage || '',
      state: profile.state || '',
      district: profile.district || '',
      village: profile.village || '',
      farming_experience: profile.farmingExperience || '',
      short_bio: profile.shortBio || '',
      is_draft: false,
    };

    const response = await apiClient.post('/farmer/profile/', payload);
    return response.data;
  } catch (error) {
    console.error('Error updating farmer profile:', error.response?.data || error.message);
    throw error;
  }
};

// ── UPLOAD PROFILE IMAGE ────────────────────────────────────────────────────
export const uploadProfileImage = async (file, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('profile_image', file);

    const response = await apiClient.post('/farmer/profile/photo/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percent);
      },
    });
    return response.data.profile_image;
  } catch (error) {
    console.error('Error uploading profile image:', error.response?.data || error.message);
    throw error;
  }
};