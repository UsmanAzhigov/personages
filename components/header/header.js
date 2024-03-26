const logOut = document.querySelector('.logOut');
const personages = document.querySelector('.personages');
// Обработчик клика по кнопке выхода
logOut.addEventListener('click', () => {
  window.api.logout().then(() => {
    if (window.location.pathname === '/home/home.html') {
      window.location.href = '/';
      deleteCookie('sessionid');
    }
  });
});

personages.addEventListener('click', () => {
  const sessionId = getCookie('sessionid');
  if (!sessionId) {
    alert('Вы должны войти в аккаунт чтобы получить доступ к персонажам!');
  } else {
    window.location.href = '/home/home.html';
  }
});

const profile = document.querySelector('.profile');
const loginButton = document.createElement('button');
const registerButton = document.createElement('button');
const isLoggedOut = getCookie('sessionid');

// Если пользователь вышел, отображаем кнопки входа и регистрации
if (!isLoggedOut) {
  // Создаем кнопки для входа и регистрации
  loginButton.classList.add('login');
  loginButton.textContent = 'Вход';
  loginButton.addEventListener('click', () => {
    window.location.href = '/login/login.html';
  });

  registerButton.classList.add('register');
  registerButton.textContent = 'Регистрация';
  registerButton.addEventListener('click', () => {
    window.location.href = '/register/register.html';
  });

  // Заменяем профиль кнопками входа и регистрации
  profile.innerHTML = '';
  profile.appendChild(loginButton);
  profile.appendChild(registerButton);
}

// Событие при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
  const profile = document.querySelector('.profile');
  const sessionId = getCookie('sessionid');

  if (sessionId) {
    // Отображаем профиль пользователя
    window.api.getProfile().then((data) => {
      if (!data.success) {
        console.log(data);
      } else {
        profile.innerHTML = `
      <img class="avatar_user" width="32px" height="32px" src="${data.avatar}" />
      <h5 class="name_user">${data.username}</h5>
      <button class="logOut">
        <img src="/icons/logOut.svg" />
      </button>
      `;
      }
    });
  }
});
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Функция для удаления куки по имени
function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
