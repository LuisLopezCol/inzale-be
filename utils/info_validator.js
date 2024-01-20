/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @return {boolean} Returns true if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
  if (!email) return false;

  const validateEmail =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email);

  return validateEmail;
};

/**
 * Checks the validity of the password.
 *
 * @param {string} password - The password to be checked
 * @return {boolean} validity of the password
 */
const onCheckPassword = (password) => {
  if (!password) return false;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return (isValid = hasLetter && hasNumber && password.length >= 8);
};

module.exports = {
  validateEmail,
  onCheckPassword,
};
