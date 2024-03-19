function extractCsrfTokenFromCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name.trim() === 'csrftoken') {
      return value;
    }
  }
}

const csrfToken = extractCsrfTokenFromCookie();
console.log('csrftoken:', csrfToken);

const headers = {};
if (csrfToken) {
  headers['X-CSRFToken'] = csrfToken;
}
