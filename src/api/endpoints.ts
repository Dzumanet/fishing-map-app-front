const API_BASE_URL = 'http://localhost:3001';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    CHECK: `${API_BASE_URL}/auth/check`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REGISTER: `${API_BASE_URL}/user/register`,
    USER_INFO: `${API_BASE_URL}/user`,
    FISH_LIST: `${API_BASE_URL}/fish`,
    FISH_SEARCH: `${API_BASE_URL}/fish/search`,
    ADD_FISH: `${API_BASE_URL}/fish/add`,
    USER_FISH: `${API_BASE_URL}/fish/user-fish`,
    GET_ONE_FISH: `${API_BASE_URL}/fish/one`,
    EDIT_ONE_FISH: `${API_BASE_URL}/fish/edit`,
    DELETE_ONE_FISH: `${API_BASE_URL}/fish/remove`,
}
