/**
 * if the element class name has submit button then it's a form.
 * if form is a login form validate it else if it's a registration form validate also
 * @param {HTML element} ele - Check for class name on element
 * @returns {void}
 *
 */

function submit_form(targetEl) {
  let result;
  const form = targetEl.closest("form");
  const inputs = elementAll(`.${form.className} input`);
  const form_class = Array.from(form.classList);

  //Sign in form validation
  if (form_class.includes("sign-in-form")) {
    result = form_validation(inputs);
    if (result) sign_in(result);
    else return;
  }

  //Sign up form validation
  if (form_class.includes("sign-up-form")) {
    result = form_validation(inputs);
    if (result) sign_up(result);
    else return;
  }

  //Reset password form validation
  if (form_class.includes("reset-password-form")) {
    result = form_validation(inputs);
    if (result) alert("User reset password!");
    else return;
  }

  // reset(inputs);
}

/**
 * Validate any form that is passed. if an input element has an empty value notify the user to insert a value and exit validation
 * @param  {HTML element} form - form input elements pass for validation
 * @returns {object} data - storing the value of each input element
 *
 */
function form_validation(form) {
  const data = {};

  for (const input of form) {
    if (!input.value) {
      const form_group = input.closest(".form-group-item");
      form_group.classList.add("incomplete");
      setTimeout(() => remove_class(form_group, "incomplete"), 1000);
      return false;
    } else {
      if (input.name == "email") {
        // validating email
        if (!email(input.value)) return alert("invalid email address");
      }

      if (input.name == "password") {
        // validating password
        if (!password(input.value))
          return alert(
            "Password should have atleast one uppercase, lowercase, digit and symbol"
          );
      }

      data[input.name] = input.value;
    }
  }
  return data;
}

/**
 * Validating a valid email address. if email address is valid return true else return false
 * @param mail - input elements value pass for validation
 * @returns {boolean} - true / false
 *
 */
const valid_email =
  /^[a-zA-Z0-9.!#$%&'*+/=?^/_`{|}~-]+@[a-z]+(?:\.[a-zA-Z0-9]+)*$/;
const email = (mail) => (mail.match(valid_email) ? true : false);

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

function sign_in(result) {
  get_user()
    .then((data) => {
      const user = data.find(
        (val) => val.email === result.email && val.password === result.password
      );
      user
        ? redirect("/chat.html", user)
        : alert("Wrong user email or password!");
    })
    .catch((err) => console.log(err.message));
}

function sign_up(result) {
  get_user().then((data) => {
    const user = data.find((val) => val.email === result.email);
    user
      ? alert("User already exist!")
      : post_user(result)
          .then((data) => {
            alert("User successfully signed in!");
            toggle_forms(element(".sign-in"), "sign-in");
          })
          .catch((err) => console.log(err));
  });
}
