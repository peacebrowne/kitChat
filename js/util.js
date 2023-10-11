/**
 * Removes a class from an html element
 * @param {*} ele
 * @param {*} clas
 * @returns HTMLElement
 */
function remove_class(ele, clas) {
  ele.classList.remove(clas);
  return ele;
}

/**
 * @param clas - Class to be added to the specified html element.
 */
const add_class = (ele, clas) => ele.classList.add(clas);

/**
 * @param clas - Class to be added to the specified html element.
 */
const toggle_class = (ele, clas) => ele.classList.toggle(clas);

/**
 * Query the DOM for specified element and return it.
 * @param {HTMLElement} ele
 * @returns {HTMLElement}
 */
const element = (ele) => document.querySelector(`${ele}`);

/**
 * Return all element that has the specified classname or element name
 * @param {*} ele
 * @returns {HTMLCollection}
 */
const elementAll = (ele) => document.querySelectorAll(`${ele}`);

/**
 * Reset all input element to default value;
 * @param {HTMLCollection} form
 */
function reset(form) {
  form.forEach((input) => {
    input.value = "";
  });
}

/**
 * Generating random colors for user's friends
 */
function frd_bg_color() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 250);
    if (i === 2) break;
    color += ",";
  }

  return color;
}

function redirect(page, user) {
  const active = localStorage.getItem("active");

  // Removing user password before storing user info in localstorage
  if (user) delete user.password;

  if (active) {
    localStorage.removeItem("active");
    localStorage.removeItem("account");
  } else {
    localStorage.setItem("active", "true");
    localStorage.setItem("account", JSON.stringify(user));
  }

  // Checking if user is active
  location.replace(`/kitChat${page}`);
}
