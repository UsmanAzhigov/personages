const profile = document.querySelector('.profile');
const logOut = document.querySelector('.logOut');
const personages = document.querySelector('.personages');

// Обработчик клика по кнопке выхода
logOut.addEventListener('click', () => {
  window.api.logout().then(() => {
    if (window.location.pathname === '/home/home.html') {
      window.location.href = '/';
    }
  });
});

personages.addEventListener('click', () => {
  if (window.api.getProfile()) {
    window.location.href = '/home/home.html';
  } else {
    alert('Войдите в аккаунт');
  }
});

// Кнопки для входа и регистрации
const loginButton = document.createElement('button');
const registerButton = document.createElement('button');

// Отображаем профиль пользователя
window.api.getProfile().then((data) => {
  if (data.ok) {
    profile.innerHTML = `
      <img class="avatar_user" width="32px" height="32px" src="${data.image}" />
      <h5 class="name_user">${data.username}</h5>
      <button class="logOut">
        <img src="/icons/logOut.svg" />
      </button>
      `;
    if (data.image === null) {
      const image = profile.querySelector('.avatar_user');
      image.src = '/icons/userIcon.png';
    }
  }

  // Если пользователь вышел, отображаем кнопки входа и регистрации
  if (data.status === 403) {
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
