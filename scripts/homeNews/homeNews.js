function logout(base_url, headers) {
  fetch(`${base_url}accounts/logout/`, {
    method: 'POST',
    headers: headers,
  }).then((response) => {
    localStorage.clear();
    const isLoggedOut = true;
    response.json();
    localStorage.setItem('isLoggedOut', isLoggedOut);
    window.location.href = '/';
  });
}
