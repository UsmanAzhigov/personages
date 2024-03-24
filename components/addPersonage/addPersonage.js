const savePersonageBtn = document.querySelector('#addPersonageBtn');
const cancelPersonageBtn = document.querySelector('#cancelPersonageBtn');
const nameInput = document.querySelector('#name');
const activePeriod = document.querySelector('.start input');
const endPeriod = document.querySelector('#period');
const placeInput = document.querySelector('#place');
const additionalInformationInput = document.querySelector('#additional_information');
const fractionInput = document.querySelector('#fraction');
const imageBlock = document.querySelector('.image_block');
const addAvatarInput = document.querySelector('#add-avatar-input');
const allInputs = document.querySelectorAll('.addPersonage_form input');

// Функция для загрузки изображения
function uploadImage(event) {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const image = document.createElement('img');
    image.classList.add('img');
    image.src = reader.result;
    imageBlock.innerHTML = '';
    imageBlock.appendChild(image);
  };

  reader.readAsDataURL(selectedFile);
}

// Привязка функции uploadImage к событию изменения input[type="file"]
addAvatarInput.addEventListener('change', uploadImage);

allInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    savePersonageBtn.disabled = event.target.value.trim() === '';
    cancelPersonageBtn.disabled = event.target.value.trim() === '';
  });
});

savePersonageBtn.disabled = true;
cancelPersonageBtn.disabled = true;

savePersonageBtn.style.width = '111px';
cancelPersonageBtn.style.width = '111px';
const closeModalBtn = document.querySelector('#close-personages-modal');

function closeModal() {
  document.querySelector('#addPersonageModal').innerHTML = '';
  document.querySelector('#addPersonageModal').style.display = 'none';
}

function savePersonage() {
  try {
    const formData = new FormData();
    formData.append('name', nameInput.value);
    formData.append('active_start_date', activePeriod.value);
    formData.append('active_end_date', endPeriod.value);
    formData.append('place', placeInput.value);
    formData.append('description', additionalInformationInput.value);
    formData.append('show_fraction', 1);
    window.api.createPersonas(formData).then((res) => {
      window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
}

savePersonageBtn.addEventListener('click', savePersonage);
closeModalBtn.addEventListener('click', closeModal);
