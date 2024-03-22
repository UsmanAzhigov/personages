/**
 * Сброс пароля
 */
function resetPassword(user_id, timestamp, signature, password, headers, base_url, handleErrors) {
  fetch(`${base_url}accounts/reset-password/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
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
