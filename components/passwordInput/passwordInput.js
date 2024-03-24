const eyeIcon = document.querySelector('.eye_icon');
const label = document.querySelector('.label');

if (window.location.href.includes('reset-password')) {
  label.textContent = 'Новый пароль';
} else {
  label.textContent = 'Пароль';
}
//Смена видимости пароля
eyeIcon.addEventListener('click', () => {
  if (document.getElementById('password').type === 'password') {
    document.getElementById('password').type = 'text';
    eyeIcon.src = '/icons/eyeIcon.svg';
  } else {
    document.getElementById('password').type = 'password';
    eyeIcon.src = '/icons/closeEyeIcon.svg';
  }
});
