/**
 * Removes a class from an html element
 * @param {*} ele
 * @param {*} clas
 * @returns HTMLElement
 */
const removeClass = (ele, clas) => {
  ele.classList.remove(clas);
  return ele;
};

/**
 * @param clas - Class to be added to the specified html element.
 */
const addClass = (ele, clas) => ele.classList.add(clas);

/**
 * @param ele - HTML element
 * @param clas - Class to be added to the specified html element.
 */
const toggleClass = (ele, clas) => ele.classList.toggle(clas);

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
function resetForm(form) {
  form.forEach((input) => {
    input.value = "";
  });
}

/**
 * Generating random colors for user's friends
 */
function frdBgColor() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 250);
    if (i === 2) break;
    color += ",";
  }

  return `rgb(${color})`;
}

/**
 * Redirecting user's to different pages.
 */
function redirect(page, email) {
  const active = localStorage.getItem("active");

  if (active) {
    localStorage.removeItem("active");
    localStorage.removeItem("account");
  } else {
    localStorage.setItem("active", "true");
    localStorage.setItem("account", JSON.stringify(email));
  }

  // Checking if user is active
  location.replace(page);
}
