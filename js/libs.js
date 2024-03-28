/**
 * Перевод ошибок
 *
 * @param {*} text Текст ошибки
 * @returns string
 */
function translateError(text) {
  const map = {
    'This field may not be blank.': 'Это поле не может быть пустым.',
    "Passwords don't match": 'Пароли не совпадают',
  };

  return map[text] || text;
}

/**
 * Отображение спиннера
 */
function showSpinner() {
  const spinner = document.createElement('span');

  if (spinner) {
    spinner.classList.add('spinner');
    document.querySelector('.btn').appendChild(spinner);
  }
}

/**
 * Скрытие спиннера
 */
function hideSpinner() {
  const spinner = document.querySelector('.spinner');

  if (spinner) {
    spinner.parentNode.removeChild(spinner);
  }
}

/**
 * Показать всплывающее уведомление
 *
 * @param {*} message Текст сообщения
 * @param {*} type Тип сообщения (`success`, `error`)
 */
function showToast(message, type) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'bottom',
    position: 'right',
    backgroundColor: type === 'success' ? '#4CAF50' : '#FF6347',
  }).showToast();
}

/**
 * Получение csrfToken из куки
 *
 * @returns Возвращает csrfToken | null
 */
function extractCsrfTokenFromCookie() {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');

    if (name.trim() === 'csrftoken') {
      return value;
    }
  }
}
