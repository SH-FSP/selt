// import axios from 'axios';
// //----
// import {API_DOMAIN} from './endpoints';
// import {QueryClient} from '@tanstack/react-query';
// import {showMessage} from '../utils';
// import {KEYS} from '../constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const queryClient = new QueryClient();

// // Function to fetch dynamic base URL
// const fetchBaseURL = async () => {
//   try {
//     const response = await axios.get(
//       'https://pro-fixer.demoappprojects.com/west-coast-roofers-gutters/api/live/url',
//     );
//     return response?.data?.data; // Assuming the baseUrl is in the 'data' key
//   } catch (error) {
//     console.warn(
//       'Failed to fetch dynamic base URL, using fallback:',
//       error?.message,
//     );
//     // Fallback to the current base URL if the API call fails
//     return null;
//     // return API_DOMAIN;
//   }
// };

// const api = axios.create({
//   baseURL: API_DOMAIN,
// });

// api.interceptors.request.use(
//   async config => {
//     // Flag to track if we've already updated the base URL
//     let baseURLUpdated = false;

//     const response = await fetchBaseURL();
//     console.log(response);
//     // Update base URL only once
//     if (!baseURLUpdated) {
//       try {
//         const dynamicBaseURL = await fetchBaseURL();
//         api.defaults.baseURL = dynamicBaseURL;
//         baseURLUpdated = true; // This prevents future fetches
//         console.log('Updated base URL to:', dynamicBaseURL);
//       } catch (error) {
//         console.warn('Failed to update base URL:', error.message);
//       }
//     }

//     const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   res => res,
//   err => {
//     const error = err.response;
//     console.log('Error in Axios Response Instance: ', error);

//     if (error?.status === 500) {
//       showMessage({
//         type: 'danger',
//         message: error?.data?.error || 'Something went wrong please try again',
//       });
//     }

//     if (error?.status === 400 || error?.status === 401) {
//       showMessage({
//         type: 'danger',
//         message: error?.data?.message || 'Something went wrong! Bad Request',
//       });
//     }

//     if (error?.status === 404) {
//       showMessage({
//         type: 'danger',
//         message: 'Request not found!',
//       });
//     }

//     if (error?.status === 403) {
//       showMessage({
//         type: 'danger',
//         message: 'Forbidden!',
//       });
//     }

//     return Promise.reject(err);
//   },
// );

// export default api;

import axios from 'axios';
import { API_DOMAIN } from './endpoints';
import { QueryClient } from '@tanstack/react-query';
import { showMessage } from '../utils';
import { KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const queryClient = new QueryClient();

const api = axios.create({
  baseURL: API_DOMAIN,
});

// ---- Dynamic baseURL setup ----
let baseURLUpdated = false;

const fetchBaseURL = async () => {
  try {
    const response = await axios.get(
      'https://pro-fixer.demoappprojects.com/west-coast-roofers-gutters/api/live/url',
    );
    return response?.data?.data || API_DOMAIN;
  } catch (error) {
    console.warn(
      'Failed to fetch dynamic base URL, using fallback:',
      error?.message,
    );
    return API_DOMAIN;
  }
};

api.interceptors.request.use(
  async config => {
    // if (!baseURLUpdated) {
    //   try {
    //     const dynamicBaseURL = await fetchBaseURL();
    //     // api.defaults.baseURL = dynamicBaseURL;
    //     baseURLUpdated = true;
    //   } catch (error) {
    //     console.warn('Failed to update base URL:', error?.message);
    //   }
    // }

    // Always ensure config uses the latest baseURL

    console.log(
      '🚀 ~ api.js:150 ~ api.defaults.baseURL:',
      api.defaults.baseURL,
    );
    // config.baseURL = api.defaults.baseURL;

    const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('🚀 ~ api.js:153 ~ config:', config.baseURL);
    return config;
  },
  error => Promise.reject(error),
);

// ---- Response Interceptor ----
api.interceptors.response.use(
  res => res,
  err => {
    const error = err.response;
    console.log('Error in Axios Response Instance:', error);

    if (!error) return Promise.reject(err);

    const status = error.status;
    const message =
      error?.data?.message ||
      error?.data?.error ||
      'Something went wrong. Please try again.';

    if ([400, 401, 403, 404, 500].includes(status)) {
      showMessage({ type: 'danger', message });
    }

    return Promise.reject(err);
  },
);

export default api;
