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
  const resp = await fetch(`${window.API_URL}${path}`, {
    method: options.method,
    headers: {
      "X-CSRFToken": window.CSRF_TOKEN,
      ...options.headers,
    },
    body: options.body,
  });

  return await resp.json();
}

/**
 * Класс для работы с API
 * Нужен для того, чтобы каждый раз не повторять один и тот же код отправки запроса
 * все запросы должны выполняться через этот класс
 */
class ApiServices {
  async getPersonas() {
    return apiRequest(window.ENDPOINTS.PERSONAS);
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
}

window.api = new ApiServices();
