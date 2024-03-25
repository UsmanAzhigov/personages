/**
 * При загрузке страницы получаем предварительно csrfToken
 */

window.onload = function () {
  window.CSRF_TOKEN = extractCsrfTokenFromCookie();
};

/**
 * Функция для обращения к API
 *
 * @param url - адрес API
 * @returns Возвращает ответ от сервера | null
 */
async function apiRequest(path, options = { method: "GET" }) {
  const headers = {};

  if (window.CSRF_TOKEN) {
    headers["X-CSRFToken"] = window.CSRF_TOKEN;
  }
  const resp = await fetch(`${window.API_URL}${path}`, {
    method: options.method,
    headers: {
      ...headers,
      ...options.headers,
    },
    body: options.body,
  });

  const { ok, status } = resp;
  const data = await resp.json();

  return { ...data, ok, status };
}

/**
 * Класс для работы с API
 * Нужен для того, чтобы каждый раз не повторять один и тот же код отправки запроса
 * все запросы должны выполняться через этот класс
 */
class ApiServices {
  async getPersonas() {
    return apiRequest(window.ENDPOINTS.CREATE_PERSONAS, { method: "GET" });
  }

  async logout() {
    return apiRequest(window.ENDPOINTS.LOGOUT, { method: "POST" });
  }

  async register(formData) {
    return apiRequest(window.ENDPOINTS.REGISTER, {
      method: "POST",
      body: formData,
    });
  }

  async login(formData) {
    return apiRequest(window.ENDPOINTS.LOGIN, {
      method: "POST",
      body: formData,
    });
  }

  async getNews(limit = 5, offset = 0) {
    return apiRequest(
      window.ENDPOINTS.NEWS + `?limit=${limit}&offset=${offset}`
    );
  }
  async getProfile() {
    return apiRequest(window.ENDPOINTS.PROFILE, { method: "GET" });
  }
  async login(formData) {
    return apiRequest(window.ENDPOINTS.LOGIN, {
      method: "POST",
      body: formData,
    });
  }

  async forgotPassword(formData) {
    return apiRequest(window.ENDPOINTS.FORGOT_PASSWORD, {
      method: "POST",
      body: formData,
    });
  }

  async resetPassword(formData) {
    return apiRequest(window.ENDPOINTS.RESET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formData),
    });
  }

  async verifyRegister(formData) {
    return apiRequest(window.ENDPOINTS.VERIFY_REGISTER, {
      method: "POST",
      body: formData,
    });
  }

  async createPersonas(formData) {
    return apiRequest(window.ENDPOINTS.CREATE_PERSONAS, {
      method: "POST",
      body: formData,
    });
  }
}

window.api = new ApiServices();
