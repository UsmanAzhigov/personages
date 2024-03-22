const eyeIcons = document.querySelectorAll(".eye_icon");
const inputPasswords = document.querySelectorAll(".password_block input");
const loginBtn = document.querySelector(".btn");

// loginBtn.style.width = "100%";
// Смена видимости пароля
eyeIcons.forEach((eyeIcon, index) => {
  eyeIcon.addEventListener("click", () => {
    if (inputPasswords[index].type === "password") {
      inputPasswords[index].type = "text";
      eyeIcon.src = "/icons/eyeIcon.svg";
    } else {
      inputPasswords[index].type = "password";
      eyeIcon.src = "/icons/closeEyeIcon.svg";
    }
  });
});

// Функция входа
async function login() {
  const email = document.querySelector("#login").value;
  const password = document.querySelector("#password").value;
  const isLoggedIn = true;

  const formData = new FormData();
  formData.append("login", email.toLowerCase());
  formData.append("password", password);

  const data = await window.api.login(formData);

  // Проверка успешности логина
  if (data?.detail === "Login successful") {
    // Редиректим на персонажей в случае удачи
    window.location.href = "/home/home.html";
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.removeItem("isLoggedOut");
  } else {
    // Показываем ошибки в случае неудачи
    handleErrors(data);
  }
}

// Обработка ошибок
function handleErrors(data) {
  // Массив проверяемых полей
  const inputs = ["password", "login"];

  inputs.forEach((el) => {
    const errorInput = document.querySelector(`#${el}`);
    const errorInputLabel = document.querySelector(`#${el}-error-label`);
    const forgotPassword = document.querySelector(".forgot_password");
    if (data[el]) {
      if (errorInput) {
        errorInput.classList.add("error-input");
        errorInputLabel?.classList.remove("none");
        errorInputLabel.textContent = translateError(data[el][0]);
        forgotPassword.textContent = "Восстановить";
      }
    } else {
      if (errorInput) {
        errorInput?.classList?.remove("error-input");
        errorInputLabel?.classList?.add("none");
        errorInputLabel.textContent = "";
      }
    }
  });
}

// Обработка нажатия на кнопку
loginBtn.addEventListener("click", () => {
  login();
});
