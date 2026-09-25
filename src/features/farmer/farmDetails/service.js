
import axios from 'axios';


// ============================================================
// API CONFIG
// ============================================================

const API_BASE_URL = 'http://127.0.0.1:8000/account';


// ============================================================
// AXIOS INSTANCE
// ============================================================

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});


// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ============================================================
// RESPONSE INTERCEPTOR
// ACCESS TOKEN REFRESH
// ============================================================

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem('refresh_token') ||
          sessionStorage.getItem('refresh_token');

        if (!refreshToken) {
          throw new Error('Refresh token not found');
        }

        const response = await axios.post(
          `${API_BASE_URL}/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = response.data.access;

        const storage =
          localStorage.getItem('access_token')
            ? localStorage
            : sessionStorage;

        storage.setItem(
          'access_token',
          newAccessToken
        );

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return apiClient(originalRequest);

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


// ============================================================
// EMPTY FARM OBJECT
// ============================================================

const getEmptyFarmDetails = () => ({
  farmName: '',
  farmOwner: '',
  village: '',
  district: '',
  state: '',
  pinCode: '',

  location: {
    address: '',
    latitude: '',
    longitude: '',
  },

  totalArea: '',
  areaUnit: 'Acres',

  soilType: '',
  farmingMethod: '',
  irrigationType: '',
  waterSource: '',

  crops: [],
  photos: [],

  sustainabilityPractices: [],
  otherPractice: '',
});


// ============================================================
// STRING HELPER
// ============================================================

const cleanString = (value) => {
  if (
    value === null ||
    value === undefined
  ) {
    return '';
  }

  return String(value).trim();
};


// ============================================================
// COORDINATE VALIDATION
//
// Django model:
// latitude  -> DecimalField(... decimal_places=6)
// longitude -> DecimalField(... decimal_places=6)
//
// We send ONLY valid values.
// ============================================================

const normalizeCoordinate = (
  value,
  type
) => {

  const cleaned = cleanString(value);

  if (!cleaned) {
    return null;
  }

  const number = Number(cleaned);

  if (!Number.isFinite(number)) {
    return null;
  }


  // -----------------------------
  // LATITUDE
  // -----------------------------

  if (type === 'latitude') {

    if (
      number < -90 ||
      number > 90
    ) {
      return null;
    }

    return number.toFixed(6);
  }


  // -----------------------------
  // LONGITUDE
  // -----------------------------

  if (type === 'longitude') {

    if (
      number < -180 ||
      number > 180
    ) {
      return null;
    }

    return number.toFixed(6);
  }


  return null;
};


// ============================================================
// DECIMAL / NUMBER VALIDATION
// ============================================================

const normalizeNumber = (value) => {

  const cleaned = cleanString(value);

  if (!cleaned) {
    return null;
  }

  const number = Number(cleaned);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number;
};


// ============================================================
// SUSTAINABILITY MAPPING
// ============================================================

const mapSustainabilityToPayload = (
  practices = [],
  otherPractice = ''
) => {

  const selectedPractices =
    Array.isArray(practices)
      ? practices
      : [];

  return {
    has_organic_farming:
      selectedPractices.includes(
        'Organic Farming'
      ),

    has_crop_rotation:
      selectedPractices.includes(
        'Crop Rotation'
      ),

    has_natural_fertilizers:
      selectedPractices.includes(
        'Natural Fertilizers'
      ),

    has_water_conservation:
      selectedPractices.includes(
        'Water Conservation'
      ),

    has_soil_health_management:
      selectedPractices.includes(
        'Soil Health Management'
      ),

    has_integrated_pest_management:
      selectedPractices.includes(
        'Integrated Pest Management'
      ),

    has_agroforestry:
      selectedPractices.includes(
        'Agroforestry'
      ),

    other_sustainability_practice:
      selectedPractices.includes(
        'Other (Please specify)'
      )
        ? cleanString(otherPractice)
        : '',
  };
};


// ============================================================
// GET FARM DETAILS
// ============================================================

export const getFarmDetails = async () => {

  try {

    const response =
      await apiClient.get(
        '/farmer/farm-details/'
      );

    const data =
      response.data?.data ||
      response.data ||
      {};


    // ========================================================
    // SUSTAINABILITY
    // ========================================================

    const sustainabilityPractices = [];


    if (data.has_organic_farming) {
      sustainabilityPractices.push(
        'Organic Farming'
      );
    }

    if (data.has_crop_rotation) {
      sustainabilityPractices.push(
        'Crop Rotation'
      );
    }

    if (data.has_natural_fertilizers) {
      sustainabilityPractices.push(
        'Natural Fertilizers'
      );
    }

    if (data.has_water_conservation) {
      sustainabilityPractices.push(
        'Water Conservation'
      );
    }

    if (data.has_soil_health_management) {
      sustainabilityPractices.push(
        'Soil Health Management'
      );
    }

    if (data.has_integrated_pest_management) {
      sustainabilityPractices.push(
        'Integrated Pest Management'
      );
    }

    if (data.has_agroforestry) {
      sustainabilityPractices.push(
        'Agroforestry'
      );
    }

    if (
      data.other_sustainability_practice
    ) {
      sustainabilityPractices.push(
        'Other (Please specify)'
      );
    }


    // ========================================================
    // COORDINATES
    // ========================================================

    const latitude =
      normalizeCoordinate(
        data.latitude,
        'latitude'
      );

    const longitude =
      normalizeCoordinate(
        data.longitude,
        'longitude'
      );


    // ========================================================
    // RETURN FRONTEND FORMAT
    // ========================================================

    return {

      farmName:
        cleanString(data.farm_name),

      farmOwner:
        cleanString(data.farm_owner),

      village:
        cleanString(data.village),

      district:
        cleanString(data.district),

      state:
        cleanString(data.state),

      pinCode:
        cleanString(data.pin_code),


      location: {

        address:
          cleanString(
            data.farm_location_address
          ),

        latitude:
          latitude ?? '',

        longitude:
          longitude ?? '',
      },


      totalArea:
        data.total_farm_area !== null &&
        data.total_farm_area !== undefined
          ? String(data.total_farm_area)
          : '',


      areaUnit:
        data.area_unit || 'Acres',


      soilType:
        data.soil_type || '',


      farmingMethod:
        data.farming_method || '',


      irrigationType:
        data.irrigation_type || '',


      waterSource:
        data.water_source || '',


      crops:
        Array.isArray(
          data.main_crops_grown
        )
          ? data.main_crops_grown
          : [],


      photos:
        Array.isArray(data.photos)
          ? data.photos
          : [],


      sustainabilityPractices,


      otherPractice:
        cleanString(
          data.other_sustainability_practice
        ),
    };

  } catch (error) {

    // --------------------------------------------------------
    // FARM DOES NOT EXIST
    // --------------------------------------------------------

    if (
      error.response?.status === 404
    ) {
      return getEmptyFarmDetails();
    }


    console.error(
      'Error fetching farm details:',
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


// ============================================================
// BUILD FARM FORM DATA
//
// IMPORTANT:
// Only valid / meaningful values are appended.
// ============================================================

const buildFarmFormData = (
  farm = {},
  isDraft = true
) => {

  const formData =
    new FormData();


  // ==========================================================
  // BASIC INFORMATION
  // ==========================================================

  const farmName =
    cleanString(farm.farmName);

  if (farmName) {
    formData.append(
      'farm_name',
      farmName
    );
  }


  const farmOwner =
    cleanString(farm.farmOwner);

  if (farmOwner) {
    formData.append(
      'farm_owner',
      farmOwner
    );
  }


  const village =
    cleanString(farm.village);

  if (village) {
    formData.append(
      'village',
      village
    );
  }


  const district =
    cleanString(farm.district);

  if (district) {
    formData.append(
      'district',
      district
    );
  }


  const state =
    cleanString(farm.state);

  if (state) {
    formData.append(
      'state',
      state
    );
  }


  // ==========================================================
  // PIN CODE
  // ==========================================================

  const pinCode =
    cleanString(farm.pinCode);

  if (
    /^\d{6}$/.test(pinCode)
  ) {

    formData.append(
      'pin_code',
      pinCode
    );
  }


  // ==========================================================
  // FARM ADDRESS
  // ==========================================================

  const address =
    cleanString(
      farm.location?.address
    );

  if (address) {

    formData.append(
      'farm_location_address',
      address
    );
  }


  // ==========================================================
  // LATITUDE
  // ==========================================================

  const latitude =
    normalizeCoordinate(
      farm.location?.latitude,
      'latitude'
    );

  if (latitude !== null) {

    formData.append(
      'latitude',
      latitude
    );
  }


  // ==========================================================
  // LONGITUDE
  // ==========================================================

  const longitude =
    normalizeCoordinate(
      farm.location?.longitude,
      'longitude'
    );

  if (longitude !== null) {

    formData.append(
      'longitude',
      longitude
    );
  }


  // ==========================================================
  // TOTAL FARM AREA
  // ==========================================================

  const totalArea =
    normalizeNumber(
      farm.totalArea
    );

  if (
    totalArea !== null &&
    totalArea > 0
  ) {

    formData.append(
      'total_farm_area',
      totalArea.toString()
    );
  }


  // ==========================================================
  // AREA UNIT
  // ==========================================================

  const areaUnit =
    cleanString(
      farm.areaUnit
    );

  if (
    [
      'Acres',
      'Hectares',
      'Bigha',
    ].includes(areaUnit)
  ) {

    formData.append(
      'area_unit',
      areaUnit
    );
  }


  // ==========================================================
  // SOIL TYPE
  // ==========================================================

  const soilType =
    cleanString(
      farm.soilType
    );

  if (
    [
      'Loamy',
      'Clay',
      'Sandy',
      'Black',
      'Red',
      'Alluvial',
    ].includes(soilType)
  ) {

    formData.append(
      'soil_type',
      soilType
    );
  }


  // ==========================================================
  // FARMING METHOD
  // ==========================================================

  const farmingMethod =
    cleanString(
      farm.farmingMethod
    );

  if (
    [
      'Organic',
      'Conventional',
      'Natural',
      'Permaculture',
    ].includes(farmingMethod)
  ) {

    formData.append(
      'farming_method',
      farmingMethod
    );
  }


  // ==========================================================
  // IRRIGATION TYPE
  // ==========================================================

  const irrigationType =
    cleanString(
      farm.irrigationType
    );

  if (
    [
      'Drip Irrigation',
      'Sprinkler',
      'Flood Irrigation',
      'Canal',
      'Rain-fed',
    ].includes(irrigationType)
  ) {

    formData.append(
      'irrigation_type',
      irrigationType
    );
  }


  // ==========================================================
  // WATER SOURCE
  // ==========================================================

  const waterSource =
    cleanString(
      farm.waterSource
    );

  if (
    [
      'Borewell',
      'Well',
      'Canal',
      'River',
      'Pond',
    ].includes(waterSource)
  ) {

    formData.append(
      'water_source',
      waterSource
    );
  }


  // ==========================================================
  // MAIN CROPS
  // ==========================================================

  const crops =
    Array.isArray(farm.crops)
      ? farm.crops
          .map((crop) =>
            cleanString(crop)
          )
          .filter(Boolean)
      : [];


  if (crops.length > 0) {

    formData.append(
      'main_crops_grown',
      JSON.stringify(crops)
    );
  }


  // ==========================================================
  // SUSTAINABILITY
  // ==========================================================

  const sustainability =
    mapSustainabilityToPayload(
      farm.sustainabilityPractices,
      farm.otherPractice
    );


  // ----------------------------------------------------------
  // BOOLEAN VALUES
  //
  // Django currently expects:
  // True / False
  // NOT:
  // true / false
  // ----------------------------------------------------------

  formData.append(
    'has_organic_farming',
    sustainability.has_organic_farming
      ? 'True'
      : 'False'
  );

  formData.append(
    'has_crop_rotation',
    sustainability.has_crop_rotation
      ? 'True'
      : 'False'
  );

  formData.append(
    'has_natural_fertilizers',
    sustainability.has_natural_fertilizers
      ? 'True'
      : 'False'
  );

  formData.append(
    'has_water_conservation',
    sustainability.has_water_conservation
      ? 'True'
      : 'False'
  );

  formData.append(
    'has_soil_health_management',
    sustainability.has_soil_health_management
      ? 'True'
      : 'False'
  );

  formData.append(
    'has_integrated_pest_management',
    sustainability.has_integrated_pest_management
      ? 'True'
      : 'False'
  );

  formData.append(
    'has_agroforestry',
    sustainability.has_agroforestry
      ? 'True'
      : 'False'
  );


  // ==========================================================
  // OTHER SUSTAINABILITY PRACTICE
  // ==========================================================

  if (
    sustainability.other_sustainability_practice
  ) {

    formData.append(
      'other_sustainability_practice',
      sustainability.other_sustainability_practice
    );
  }


  // ==========================================================
  // DRAFT STATUS
  // ==========================================================

  formData.append(
    'is_draft',
    isDraft
      ? 'True'
      : 'False'
  );


  return formData;
};


// ============================================================
// DEBUG HELPER
// ============================================================

const logFormData = (formData) => {

  if (import.meta.env.DEV) {

    console.group(
      'Farm FormData'
    );

    for (
      const [key, value]
      of formData.entries()
    ) {

      console.log(
        key,
        value
      );
    }

    console.groupEnd();
  }
};


// ============================================================
// SAVE FARM DRAFT
// ============================================================

export const saveFarmDraft = async (
  farm
) => {

  try {

    const formData =
      buildFarmFormData(
        farm,
        true
      );


    logFormData(formData);


    const response =
      await apiClient.post(
        '/farmer/farm-details/',
        formData
      );


    return response.data;

  } catch (error) {

    console.error(
      'Error saving farm draft:',
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


// ============================================================
// UPDATE / SUBMIT FARM DETAILS
// ============================================================

export const updateFarmDetails = async (
  farm
) => {

  try {

    const formData =
      buildFarmFormData(
        farm,
        false
      );


    logFormData(formData);


    const response =
      await apiClient.post(
        '/farmer/farm-details/',
        formData
      );


    return response.data;

  } catch (error) {

    console.error(
      'Error updating farm details:',
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


// ============================================================
// UPLOAD FARM PHOTOS
// ============================================================

export const uploadFarmPhotos = async (
  files,
  currentPhotoCount = 0,
  onProgress
) => {

  try {

    const fileArray =
      Array.isArray(files)
        ? files
        : Array.from(files || []);


    // --------------------------------------------------------
    // Remove invalid files
    // --------------------------------------------------------

    const validFiles =
      fileArray.filter(
        (file) =>
          file instanceof File &&
          file.size > 0
      );


    if (
      validFiles.length === 0
    ) {

      return [];
    }


    // --------------------------------------------------------
    // FormData
    // --------------------------------------------------------

    const formData =
      new FormData();


    validFiles.forEach(
      (file) => {

        formData.append(
          'uploaded_photos',
          file
        );
      }
    );


    // --------------------------------------------------------
    // Upload
    // --------------------------------------------------------

    const response =
      await apiClient.post(
        '/farmer/farm-details/',
        formData,
        {
          onUploadProgress:
            (progressEvent) => {

              if (
                progressEvent.total &&
                onProgress
              ) {

                const percent =
                  Math.round(
                    (
                      progressEvent.loaded *
                      100
                    ) /
                    progressEvent.total
                  );

                onProgress(percent);
              }
            },
        }
      );


    return (
      response.data?.data?.photos ||
      response.data?.photos ||
      []
    );

  } catch (error) {

    console.error(
      'Error uploading farm photos:',
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default apiClient;