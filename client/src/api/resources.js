import api from './client';

// Generic REST helpers for simple flat resources (services, value-props, stats, clients, vacancies).
export function makeResource(path) {
  return {
    list: (params) => api.get(`/${path}`, { params }).then((r) => r.data),
    getOne: (id) => api.get(`/${path}/${id}`).then((r) => r.data),
    create: (data) => api.post(`/${path}`, data).then((r) => r.data),
    update: (id, data) => api.put(`/${path}/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/${path}/${id}`).then((r) => r.data),
  };
}

export const servicesApi = makeResource('services');
export const valuePropsApi = makeResource('value-props');
export const statsApi = makeResource('stats');
export const clientsApi = makeResource('clients');
export const vacanciesApi = makeResource('vacancies');
export const faqsApi = makeResource('faqs');

export const newsletterApi = {
  subscribe: (email) => api.post('/newsletter', { email }).then((r) => r.data),
  list: () => api.get('/newsletter').then((r) => r.data),
  remove: (id) => api.delete(`/newsletter/${id}`).then((r) => r.data),
};

export const programsApi = {
  ...makeResource('programs'),
  categories: () => api.get('/programs/categories').then((r) => r.data),
};

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};

export const usersApi = makeResource('users');

export const contactApi = {
  submit: (data) => api.post('/contact', data).then((r) => r.data),
  list: () => api.get('/contact').then((r) => r.data),
  markRead: (id, isRead = true) => api.patch(`/contact/${id}/read`, { isRead }).then((r) => r.data),
  remove: (id) => api.delete(`/contact/${id}`).then((r) => r.data),
};

export const settingsApi = {
  get: () => api.get('/settings').then((r) => r.data),
  update: (data) => api.put('/settings', data).then((r) => r.data),
};

export const dashboardApi = {
  summary: () => api.get('/dashboard/summary').then((r) => r.data),
};

export const uploadApi = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api
      .post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data);
  },
};
