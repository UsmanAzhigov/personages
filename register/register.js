let source;
let fileName;
let newSelectedFile;

window.onload = function () {
  // Массив всех проверяемых полей
  const inputs = ['password', 'username', 'email', 'password_confirm', 'image'];

  const registerHeader = document.querySelector('.register_header');
  const eyeIcons = document.querySelectorAll('.eye_icon');
  const inputPasswords = document.querySelectorAll('.password_block input');
  const registerBtn = document.querySelector('.btn');
  const conditions = document.querySelector('.conditions input');
  const addAvatarInput = document.querySelector('#add-avatar-input');
  const selectedFile = addAvatarInput.files[0];
  const addAvatarDiv = document.querySelector('.add_avatar');
  const passwordBlock = document.querySelector('.password_block');
  registerHeader.style.justifyContent = 'space-between';

  passwordBlock.style.flexDirection = 'row';

  registerHeader.style.justifyContent = 'flex-start';

  registerBtn.style.width = '100%';

  /**
   * Вызов окна выбора файла при клике на аватарку
   */
  function onClickAvatar(event) {
    if (!event.target.classList.contains('add-avatar')) {
      addAvatarInput.click();
    }
  }

  /**
   * Блокируем клик по кнопке регистрации,
   * если пользователь не согласен с политикой
   */
  conditions.addEventListener('change', () => {
    registerBtn.disabled = !conditions.checked;
  });

  /**
   * Устанавливаем событие клика на все иконки "показать пароль".
   * При клике происходит переключение типа ввода пароля и иконки
   */
  eyeIcons.forEach((eyeIconElem, index) => {
    eyeIconElem.addEventListener('click', () => {
      const inputPassword = inputPasswords[index];

      if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        eyeIconElem.src = '/icons/eyeIcon.svg';
      } else {
        inputPassword.type = 'password';
        eyeIconElem.src = '/icons/closeEyeIcon.svg';
      }
    });
  });

  /**
   * Устанавливаем событие изменения выбранного файла
   * при изменении файла происходит обрезка аватара
   */
  addAvatarInput.addEventListener('change', () => {
    const selectedFile = addAvatarInput.files[0];

    newSelectedFile = selectedFile;

    // Если файл выбран, то открываем модальное окно
    if (selectedFile) {
      // Загружаем HTML-код модального окна
      $('#avatarCropModal').load('../components/add-avatar-modal/add-avatar-modal.html');

      const reader = new FileReader();

      reader.onload = (e) => {
        source = e.target.result;
        fileName =
          selectedFile.name.length > 15
            ? selectedFile.name.substr(0, 15) + '...'
            : selectedFile.name;
      };

      reader.readAsDataURL(selectedFile);
    }

    addAvatarInput.value = '';
  });

  /**
   * Функция для регистрации пользователя
   */
  async function register() {
    registerBtn.innerHTML = '';
    showSpinner();
    const password = document.querySelector('#password').value;
    const password_confirm = document.querySelector('#password_confirm').value;
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;

    const formData = new FormData();

    // Если выбран файла аватарки, то добавляем его в форму
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    formData.append('password', password);
    formData.append('password_confirm', password_confirm);
    formData.append('username', username);
    formData.append('email', email.toLowerCase());

    try {
      await window.api.register(formData).then((response) => {
        if (!response.success) {
          handleErrors(response);
        }
        if (response.ok === true) {
          window.location.href = '/send-verify-register/send-verify-register.html';
        }
      });
    } catch (error) {
      console.log('Request failed', error);
    } finally {
      registerBtn.innerHTML = 'Зарегистрироваться';
      registerBtn.disabled = false;
    }
  }

  /**
   * Обработка серверных ошибок
   *
   * @param {*} data - объект с ошибками
   */
  function handleErrors(data) {
    // Цикл для проверки полей на ошибки
    inputs.forEach((el) => {
      const errorInput = document.querySelector(`#${el}`);
      const errorInputLabel = document.querySelector(`#${el}-error-label`);
      const conditionsBlock = document.querySelector('.conditions');

      if (data[el]) {
        if (errorInput) {
          errorInput.classList.add('error-input');
          errorInputLabel?.classList.remove('none');
          errorInputLabel.textContent = translateError(data[el][0]);
        } else if (el === 'image') {
          errorInput?.classList?.remove('error-input');
          errorInputLabel?.classList?.add('none');
          showToast('Загрузите изображение', 'error');
        } else {
          errorInput?.classList?.remove('error-input');
          errorInputLabel?.classList?.add('none');
          errorInputLabel.textContent = '';
        }
        if (el === 'password' && conditions) {
          conditionsBlock.style = 'margin-top: 15px;';
        }
      } else {
        if (errorInput) {
          errorInput?.classList?.remove('error-input');
          errorInputLabel.textContent = '';
          errorInputLabel?.classList?.add('none');
        }
        if (el === 'password' && conditions) {
          conditionsBlock.style = 'margin-top: 0;';
        }
      }
    });

    // Показываем текст кнопки и скрываем спиннер
    hideSpinner();
    registerBtn.innerHTML = 'Зарегистрироваться';
  }

  // Активация регистрации
  registerBtn.addEventListener('click', register);

  //   addAvatarInput.addEventListener('click', openAvatarModal);
  addAvatarDiv.addEventListener('click', onClickAvatar);
};
