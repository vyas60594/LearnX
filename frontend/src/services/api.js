import axios from 'axios';
import toast from 'react-hot-toast';

// Core API service for handling all backend communications.
// This service uses axios for requests and includes built-in toast notifications for errors.
// =============================================================
// Base API instance configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach bearer token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('learnx_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle global errors (e.g. 401 Unauthorized)
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            // Handle 401 expressly (e.g., clear auth, redirect to login via event emission or similar)
            if (error.response.status === 401) {
                console.error('Session expired or unauthorized');
                // You can clear localStorage and reload or let AuthContext handle it
            }
            
            // Generate a global toast for 500+ errors
            if (error.response.status >= 500) {
                toast.error('Server error. Please try again later.');
            }
        } else {
            // Network error
            toast.error('Network Error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

// Abstracted API endpoints interface for the frontend application
export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    verify: () => api.get('/auth/me'),
};

export const userService = {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    getDashboardStats: () => api.get('/user/stats'),
    completeModule: (moduleId, moduleTitle, skillPathId) => api.post('/user/complete-module', { moduleId, moduleTitle, skillPathId }),
    submitTestResult: (data) => api.post('/user/submit-test', data),
    claimCertificate: (skillPathId) => api.post('/user/claim-certificate', { skillPathId }),
    getCertificates: () => api.get('/user/certificates'),
};

export const progressService = {
    getProgress: () => api.get('/progress'),
    updateProgress: (data) => api.post('/progress', data),
};

export const adminService = {
    getStats: () => api.get('/admin/stats'),
    getUsers: () => api.get('/admin/users'),
    updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
    inviteUser: (data) => api.post('/admin/invite', data),
    
    // Skill Paths Admin
    getSkillPaths: () => api.get('/admin/skill-paths'),
    getSkillPathById: (id) => api.get(`/admin/skill-paths/${id}`),
    createSkillPath: (data) => api.post('/admin/skill-paths', data),
    updateSkillPath: (id, data) => api.put(`/admin/skill-paths/${id}`, data),
    deleteSkillPath: (id) => api.delete(`/admin/skill-paths/${id}`),

    // Practice Tests Admin
    getPracticeTests: () => api.get('/admin/practice-tests'),
    getPracticeTestById: (id) => api.get(`/admin/practice-tests/${id}`),
    createPracticeTest: (data) => api.post('/admin/practice-tests', data),
    updatePracticeTest: (id, data) => api.put(`/admin/practice-tests/${id}`, data),
    deletePracticeTest: (id) => api.delete(`/admin/practice-tests/${id}`),

    // Question Admin
    addQuestion: (testId, data) => api.post(`/admin/practice-tests/${testId}/questions`, data),
    updateQuestion: (id, data) => api.put(`/admin/questions/${id}`, data),
    deleteQuestion: (id) => api.delete(`/admin/questions/${id}`),
};

export const skillPathService = {
    getAll: () => api.get('/skill-paths'),
    getById: (id) => api.get(`/skill-paths/${id}`),
};

export const practiceTestService = {
    getAll: () => api.get('/practice-tests'),
    getById: (id) => api.get(`/practice-tests/${id}`),
};

export const announcementService = {
    getAll: () => api.get('/announcements'),
    create: (data) => api.post('/announcements', data),
    update: (id, data) => api.put(`/announcements/${id}`, data),
    delete: (id) => api.delete(`/announcements/${id}`),
};

export default api;
