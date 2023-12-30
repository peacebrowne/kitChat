/**
 * Submitting different types of form to the server.
 *
 * @param {HTML element} element - Element is a form submit button
 *
 */

function submitForm(element) {
  let result;
  const form = element.closest("form");
  const inputElements = getElementAll(`.${form.className} input`);
  const formClassList = Array.from(form.classList);

  //Sign in form validation
  if (formClassList.includes("sign-in-form")) {
    result = formValidation(inputElements);
    if (result) signIn(result);
    else return;
  }

  //Sign up form validation
  if (formClassList.includes("sign-up-form")) {
    result = formValidation(inputElements, "sign-up-form");
    if (result) signUp(result);
    else return;
  }

  //Reset password form validation
  if (formClassList.includes("reset-password-form")) {
    result = formValidation(inputElements);
    if (result) alert("User reset password!");
    else return;
  }

  // resetForm(inputs);
}

/**
 * Validate any form that is passed. if an input element has an empty value notify the user to insert a value and exit validation.
 *
 * @param  {HTML element} form - From input elements pass for validation.
 * @returns {String} type - Type of class to validate.
 *
 */
function formValidation(form, type) {
  const data = {};

  for (const inputElement of form) {
    if (!inputElement.value) {
      const formGroup = inputElement.closest(".form-group-item");
      formGroup.classList.add("incomplete");
      setTimeout(() => removeClass(formGroup, "incomplete"), 1000);
      return;
    } else if (type === "sign-up-form") {
      if (inputElement.name === "email") {
        // validating email
        if (!email(inputElement.value)) {
          warning("invalid email address!", "danger", "#ea060629");
          return;
        }
      }

      if (inputElement.name === "password") {
        // validating password
        if (!password(inputElement.value)) {
          warning("invalid password!", "danger", "#ea060629");
          return;
        }
      }
    }
    data[inputElement.name] = inputElement.value;
  }
  return data;
}

/**
 * Validating a valid email address, if email address is valid return true else return false
 *
 * @param {String} - User email address to be validated.
 * @returns {boolean} - true / false
 */
const email = (mail) => {
  const validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^/_`{|}~-]+@[a-z]+(?:\.[a-zA-Z0-9]+)*$/;
  return mail.match(validEmail) ? true : false;
};

/**
 * Validating a valid password. If password is valid return true else return false.
 * Password should be greater than 4 character and it should include atleast one Upper case letter, Lower case letter, digit and symbol.
 *
 * @param {String} password - User password to be validated.
 * @returns {Boolean} - True or False
 */

function password(password) {
  const upperCase = /[A-Z]/,
    lowerCase = /[a-z]/,
    digitCase = /[0-9]/,
    symbolCase = /[.!#$%&'*+/=?^/_`{|}~-]/;
  let upper, lower, digit, symbol;

  if (password.length >= 4) {
    for (const char of password) {
      if (char.match(upperCase)) upper = true;
      if (char.match(lowerCase)) lower = true;
      if (char.match(digitCase)) digit = true;
      if (char.match(symbolCase)) symbol = true;
      if (upper && lower && digit && symbol) {
        return true;
      }
    }
  }

  return false;
}

async function signIn(result) {
  const id = await postUser(result, "signIn");
  console.log({ id });
  if (id) {
    warning("Login Successfully!", "success", "#83d61631");
    setTimeout(() => redirect("chat.html", id), 2000);
  } else {
    warning("Wrong email or password!", "danger", "#ea060629");
  }
}

async function signUp(data) {
  data["color"] = frdBgColor();
  const response = await postUser(data, "user");
  if (response.status) {
    warning(`${response.msg}`, "success", "#83d61675");
    setTimeout(() => toggleForms("sign-in-form"), 1000);
  } else {
    warning(`${response.msg}`, "danger", "#ea060629");
  }
}
