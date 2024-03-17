function getCSRFTokenFromCookie(cookieName) {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var parts = cookie.split('=');
    if (parts[0] === cookieName) {
      return parts[1];
    }
  }
  return null;
}

var csrfToken = getCSRFTokenFromCookie('csrftoken');
if (csrfToken) {
  console.log('CSRF токен:', csrfToken);
} else {
  console.log('CSRF токен не найден.');
}
