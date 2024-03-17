function handleResetPassword(
  user_id,
  timestamp,
  signature,
  password,
  csrfToken,
  base_url,
  handleErrors,
) {
  fetch(`${base_url}accounts/reset-password/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({
      user_id,
      timestamp,
      signature,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = './verify-reset-password.html';
      } else {
        return response.json();
      }
    })
    .then((data) => {
      handleErrors(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
