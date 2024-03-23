// Глобальные переменные
window.API_URL = 'https://shaoshur.endwork.today/api/v1/';

window.CSRF_TOKEN = null;

// API адресы
const endpoints = {
  CREATE_PERSONAS: 'personas/',
  LOGOUT: 'accounts/logout/',
  REGISTER: 'accounts/register/',
  NEWS: 'news/',
  PROFILE: 'accounts/profile/',
  LOGIN: 'accounts/login/',
  FORGOT_PASSWORD: 'accounts/send-reset-password-link/',
  RESET_PASSWORD: 'accounts/reset-password/',
  VERIFY_REGISTER: 'accounts/verify-registration/',
};

window.ENDPOINTS = endpoints;
