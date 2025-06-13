// src/axiosConfig.ts
import axios, { type AxiosInstance } from 'axios';
import Swal from 'sweetalert2';

const environment = import.meta.env.VITE_ENVIRONMENT;
let apiUrl = '';
switch (environment) {
  case 'DEV':
    apiUrl = import.meta.env.VITE_WORKGPT_API_DEV;
    break;
  case 'UAT':
    apiUrl = import.meta.env.VITE_WORKGPT_API_UAT;
    break;
  case 'PROD':
    apiUrl = import.meta.env.VITE_WORKGPT_API_PROD;
    break;
  default:
    apiUrl = import.meta.env.VITE_WORKGPT_API_DEV;
    break;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 1000000,
});

export const configureAxiosInterceptors = (t: (key: string) => string) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const workGPTUser = JSON.parse(
        localStorage.getItem('workGPTUser') || '{}'
      );
      const token = workGPTUser.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response
        ? error.response.status
        : error.response?.code;
      switch (status) {
        case 401:
          const workGPTUser = JSON.parse(
            localStorage.getItem('workGPTUser') || '{}'
          );
          const refreshToken = workGPTUser.refreshToken;

          if (refreshToken) {
            try {
              const response = await axios.post(
                `${apiUrl}/auth/refresh-token`,
                {
                  refreshToken,
                }
              );
              const newAccessToken = response.data.data.accessToken;
              workGPTUser.token = newAccessToken;
              workGPTUser.refreshToken = response.data.data.refreshToken;
              localStorage.setItem('workGPTUser', JSON.stringify(workGPTUser));
              error.config.headers['Authorization'] =
                `Bearer ${newAccessToken}`;
              return axios(error.config);
            } catch (refreshError) {
              localStorage.removeItem('workGPTUser');
              window.location.href = '/sign-in';
              return Promise.reject(error);
            }
          }
          localStorage.removeItem('workGPTUser');
          window.location.href = '/sign-in';
          return Promise.reject(error);

        case 500:
          Swal.fire({
            title: t('Error'),
            text:
              error.response?.data?.message ||
              t('An unexpected error occurred.'),
            icon: 'error',
            confirmButtonText: t('OK'),
          });
          break;

        case 404:
          Swal.fire({
            title: t('Not Found'),
            text:
              error.response?.data?.message ||
              t('The requested resource was not found.'),
            icon: 'warning',
            confirmButtonText: t('OK'),
          });
          break;

        case 403:
          Swal.fire({
            title: t('Forbidden'),
            text:
              error.response?.message ||
              t('You do not have permission to access this resource.'),
            icon: 'warning',
            confirmButtonText: t('OK'),
          });
          break;

        case 502:
          Swal.fire({
            title: t('Bad Gateway'),
            text:
              error.response?.data?.message ||
              t(
                'The server received an invalid response from the upstream server.'
              ),
            icon: 'warning',
            confirmButtonText: t('OK'),
          });
          window.location.href = '/';
          break;

        default:
          return Promise.reject(error);
      }
    }
  );
};

export default axiosInstance;
