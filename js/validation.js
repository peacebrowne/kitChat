/**
 * if the element class name has submit button then it's a form.
 * if form is a login form validate it else if it's a registration form validate also
 * @param {HTML element} ele - Check for class name on element
 * @returns {void}
 *
 */

function submitForm(targetEl) {
  let result;
  const form = targetEl.closest("form");
  const inputs = elementAll(`.${form.className} input`);
  const formClass = Array.from(form.classList);

  //Sign in form validation
  if (formClass.includes("sign-in-form")) {
    result = formValidation(inputs);
    if (result) signIn(result);
    else return;
  }

  //Sign up form validation
  if (formClass.includes("sign-up-form")) {
    result = formValidation(inputs, "sign-up-form");
    if (result) signUp(result);
    else return;
  }

  //Reset password form validation
  if (formClass.includes("reset-password-form")) {
    result = formValidation(inputs);
    if (result) alert("User reset password!");
    else return;
  }

  // resetForm(inputs);
}

/**
 * Validate any form that is passed. if an input element has an empty value notify the user to insert a value and exit validation
 * @param  {HTML element} form - form input elements pass for validation
 * @returns {object} data - storing the value of each input element
 *
 */
function formValidation(form, type) {
  const data = {};

  for (const input of form) {
    if (!input.value) {
      const formGroup = input.closest(".form-group-item");
      formGroup.classList.add("incomplete");
      setTimeout(() => removeClass(formGroup, "incomplete"), 1000);
      return;
    } else if (type === "sign-up-form") {
      if (input.name === "email") {
        // validating email
        if (!email(input.value)) {
          warning("invalid email address!", "danger");
          return;
        }
      }

      if (input.name === "password") {
        // validating password
        if (!password(input.value)) {
          warning("invalid password!", "danger");
          return;
        }
      }
    }
    data[input.name] = input.value;
  }
  return data;
}

/**
 * Validating a valid email address. if email address is valid return true else return false
 * @param mail - input elements value pass for validation
 * @returns {boolean} - true / false
 *
 */
const validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^/_`{|}~-]+@[a-z]+(?:\.[a-zA-Z0-9]+)*$/;
const email = (mail) => (mail.match(validEmail) ? true : false);

const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const digitCase = /[0-9]/;
const symbolCase = /[.!#$%&'*+/=?^/_`{|}~-]/;

/**
 * Validating a valid password. If password is valid return true else return false.
 * Password should be greater than 4 character and it should include atleast one Upper case letter, Lower case letter, digit and symbol.
 * @param {String} password - user password
 * @returns {Boolean} - True or False
 */

function password(password) {
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

function signIn(result) {
  getUser()
    .then((data) => {
      const user = data.find(
        (val) => val.email === result.email && val.password === result.password
      );
      user
        ? redirect("chat.html", user)
        : warning("Wrong email or password!", "danger");
    })
    .catch((err) => console.log(err.message));
}

function signUp(result) {
  getUser().then((data) => {
    const user = data.find((val) => val.email === result.email);
    user
      ? warning("User already exist!", "danger")
      : postUser(result)
          .then((data) => {
            warning("Successfully Registered!", "success");
            setTimeout(() => {
              toggleForms(element(".inspired"), "sign-in-form");
            }, 2000);
          })
          .catch((err) => console.log(err));
  });
}
