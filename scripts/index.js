const base_url = "https://shaoshur.endwork.today/api/v1/";

function translateError(text) {
  switch (text) {
    case "This field may not be blank.":
      return "Это поле не может быть пустым.";
      break;
    case "Passwords don't match":
      return "Пароли не совпадают";
      break;
    default:
      return text;
      break;
  }
}

function showSpinner() {
  var spinner = document.createElement("span");
  spinner.classList.add("spinner");
  document.querySelector(".register_btn").appendChild(spinner);
  document.querySelector(".register_btn").disabled = true;
}

function hideSpinner() {
  var spinner = document.querySelector(".spinner");
  if (spinner) {
    spinner.parentNode.removeChild(spinner);
    document.querySelector(".register_btn").disabled = false;
  }
}
