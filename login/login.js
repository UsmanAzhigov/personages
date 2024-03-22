const eyeIcons = document.querySelectorAll('.eye_icon');
const inputPasswords = document.querySelectorAll('.password_block input');
const loginBtn = document.querySelector('.btn');

loginBtn.style.width = '100%';
//Смена видимости пароля
eyeIcons.forEach((eyeIcon, index) => {
  eyeIcon.addEventListener('click', () => {
    if (inputPasswords[index].type === 'password') {
      inputPasswords[index].type = 'text';
      eyeIcon.src = '/icons/eyeIcon.svg';
    } else {
      inputPasswords[index].type = 'password';
      eyeIcon.src = '/icons/closeEyeIcon.svg';
    }
  });
});
//Функция входа
function login() {
  const email = document.querySelector('#login').value;
  const password = document.querySelector('#password').value;
  const formData = new FormData();
  formData.append('login', email.toLowerCase());
  formData.append('password', password);

  window.api.login(formData).then((responseData) => {
    try {
      console.log(responseData);
      if (responseData.detail === 'Login successful') {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = '/home/home.html';
      }
      if (!responseData.success) {
        handleErrors(responseData);
      }
    } catch (error) {
      //Проверка на ошибки
      console.log(error);
      showToast('Неправильный логин или пароль', 'error');
    }
  });
}
//Обработка ошибок
function handleErrors(data) {
  const inputs = ['password', 'login'];
  console.log(data);
  inputs.forEach((el) => {
    const errorInput = document.querySelector(`#${el}`);
    const errorInputLabel = document.querySelector(`#${el}-error-label`);
    const forgotPassword = document.querySelector('.forgot_password');
    if (data[el]) {
      if (errorInput) {
        errorInput.classList.add('error-input');
        errorInputLabel?.classList.remove('none');
        errorInputLabel.textContent = translateError(data[el][0]);
        forgotPassword.textContent = 'Восстановить';
      }
    } else {
      if (errorInput) {
        errorInput?.classList?.remove('error-input');
        errorInputLabel?.classList?.add('none');
      }
    }
  });
}

//Обработка нажатия на кнопку
loginBtn.addEventListener('click', () => {
  login();
});
