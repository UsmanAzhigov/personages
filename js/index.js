//Глобальная ссылка на запросы
const base_url = 'https://shaoshur.endwork.today/api/v1/';

//Перевод ошибок
function translateError(text) {
  switch (text) {
    case 'This field may not be blank.':
      return 'Это поле не может быть пустым.';
      break;
    case "Passwords don't match":
      return 'Пароли не совпадают';
      break;
    default:
      return text;
      break;
  }
}

//Отображение спиннера
function showSpinner() {
  var spinner = document.createElement('span');
  spinner.classList.add('spinner');
  document.querySelector('.btn').appendChild(spinner);
}

//Скрытие спиннера
function hideSpinner() {
  var spinner = document.querySelector('.spinner');
  if (spinner) {
    spinner.parentNode.removeChild(spinner);
    document.querySelector('.register_btn').disabled = false;
  }
}

//Показ уведомления
function showToast(message, type) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'bottom',
    position: 'right',
    backgroundColor: type === 'success' ? '#4CAF50' : '#FF6347',
  }).showToast();
}
