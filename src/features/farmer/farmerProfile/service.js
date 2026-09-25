import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/account';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// ── REQUEST INTERCEPTOR: Attach Token ──────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR: Handle Expired Tokens Automatically ──────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
        if (refreshToken) {
          const res = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          const storage = localStorage.getItem('access_token') ? localStorage : sessionStorage;
          storage.setItem('access_token', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Helper function to format mobile number with country code (+91)
const formatMobileNumber = (mobile) => {
  if (!mobile) return '';
  const cleanNum = mobile.trim();
  if (cleanNum.startsWith('+')) return cleanNum;
  return `+91${cleanNum}`;
};

// Helper function to map frontend language to Backend TextChoices
const mapLanguageToChoice = (lang) => {
  if (!lang) return 'EN'; // Default fallback
  const upperLang = lang.toUpperCase();
  
  // Direct match if code is already sent (HI, EN, MR, etc.)
  const validCodes = ['HI', 'EN', 'BN', 'MR', 'TE', 'TA', 'GU', 'OTHER'];
  if (validCodes.includes(upperLang)) return upperLang;

  // Map readable names to backend choices
  const mapping = {
    'HINDI': 'HI',
    'ENGLISH': 'EN',
    'BENGALI': 'BN',
    'MARATHI': 'MR',
    'TELUGU': 'TE',
    'TAMIL': 'TA',
    'GUJARATI': 'GU',
  };

  return mapping[upperLang] || 'OTHER'; // Agar list me na ho to 'OTHER' bhej dega
};

// Helper function to map farming experience to Backend TextChoices
const mapExperienceToChoice = (exp) => {
  if (!exp) return '0-1'; // Default fallback
  
  // Direct match if code is already sent ("0-1", "1-5", etc.)
  const validChoices = ['0-1', '1-5', '5-10', '10-15', '15+'];
  if (validChoices.includes(exp)) return exp;

  // Flexible string mapping based on frontend inputs
  const lowerExp = exp.toLowerCase();
  if (lowerExp.includes('less than') || lowerExp.includes('0-1') || lowerExp.includes('1 year')) {
    return '0-1';
  } else if (lowerExp.includes('1-5') || lowerExp.includes('2-5') || lowerExp.includes('3-5')) {
    return '1-5';
  } else if (lowerExp.includes('5-10')) {
    return '5-10';
  } else if (lowerExp.includes('10-15')) {
    return '10-15';
  } else if (lowerExp.includes('15') || lowerExp.includes('plus') || lowerExp.includes('+')) {
    return '15+';
  }

  return '1-5'; // Safe fallback
};

// ── GET FARMER PROFILE ──────────────────────────────────────────────────────
export const getFarmerProfile = async () => {
  try {
    const response = await apiClient.get('/farmer/profile/');
    const data = response.data;
    
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
      mobile_number: formatMobileNumber(profile.mobileNumber),
      email_address: profile.email || '',
      preferred_language: mapLanguageToChoice(profile.preferredLanguage),
      state: profile.state || '',
      district: profile.district || '',
      village: profile.village || '',
      farming_experience: mapExperienceToChoice(profile.farmingExperience),
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
      mobile_number: formatMobileNumber(profile.mobileNumber),
      email_address: profile.email || '',
      preferred_language: mapLanguageToChoice(profile.preferredLanguage),
      state: profile.state || '',
      district: profile.district || '',
      village: profile.village || '',
      farming_experience: mapExperienceToChoice(profile.farmingExperience),
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