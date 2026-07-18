import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dejaf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('dejaf_token');
      localStorage.removeItem('dejaf_user');
      return Promise.reject(err);
    }

    // Free-tier hosts (e.g. Render) can return a network error or 502/503 while the
    // backend is waking up from an idle sleep. Retry a couple of times with a short
    // delay before giving up, so a cold start doesn't just look like empty content.
    const config = err.config;
    const isRetryable = !err.response || [502, 503, 504].includes(err.response.status);
    const retryCount = config?.__retryCount || 0;
    if (config && isRetryable && retryCount < 3) {
      config.__retryCount = retryCount + 1;
      await wait(config.__retryCount * 2000);
      return api(config);
    }

    return Promise.reject(err);
  }
);

export default api;
