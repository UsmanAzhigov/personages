const logOut = document.querySelector('.logOut');
const personages = document.querySelector('.personages');
// Событие при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, залогинен ли пользователь
  const isLoggedOut = false;

  window.api.getProfile().then((data) => {
    const nameUser = document.querySelector('.name_user');
    const avatar = document.querySelector('.avatar_user');
    const { username, image } = data;
    if (image) {
      avatar.src = image;
    }
    avatar.src = '/icons/userIcon.png';
    nameUser.textContent = username;
    localStorage.setItem('username', username);
    localStorage.setItem('avatar', image);
  });
  localStorage.setItem('isLoggedOut', isLoggedOut);
});

// Обработчик клика по кнопке выхода
logOut.addEventListener('click', () => {
  window.api.logout().then(() => {
    if (window.location.pathname === '/home/home.html') {
      window.location.href = '/';
    }
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('isLoggedOut', true);
    const profile = document.querySelector('.profile');
    const loginButton = document.createElement('button');
    const registerButton = document.createElement('button');
    const isLoggedOut = localStorage.getItem('isLoggedOut') === true;

    // Если пользователь вышел, отображаем кнопки входа и регистрации
    if (isLoggedOut) {
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
  });
});

personages.addEventListener('click', () => {
  if (localStorage.getItem('isLoggedOut') === 'true') {
    if (window.location.pathname === '/') {
      alert('Вы должны войти в аккаунт чтобы получить доступ к персонажам!');
    }
  } else {
    window.location.href = '/home/home.html';
  }
});

// Событие при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
  const profile = document.querySelector('.profile');
  const isLoggedOut = localStorage.getItem('isLoggedOut') === true;

  // Если пользователь вышел, отображаем кнопки входа и регистрации
  if (isLoggedOut) {
    profile.innerHTML = `
    <button class="login">Вход</button>
    <button class="register">Регистрация</button>
  `;
    const loginButton = profile.querySelector('.login');
    const registerButton = profile.querySelector('.register');

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        window.location.href = '../../login/login.html';
      });
    }

    if (registerButton) {
      registerButton.addEventListener('click', () => {
        window.location.href = '/register/register.html';
      });
    }
  } else {
    // Иначе отображаем профиль пользователя
    profile.innerHTML = `
    <img class="avatar_user" width="32px" height="32px" src="/icons/userIcon.png" />
    <h5 class="name_user"></h5>
    <button class="logOut">
      <img src="/icons/logOut.svg" />
    </button>
    `;
  }
});
