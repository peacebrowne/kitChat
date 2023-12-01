/**
 * Removes a classname from an html element
 * @param {*} element
 * @param {*} className
 * @returns HTMLElement
 */
function removeClass(element, className) {
  if (!element || !element.classList) {
    return;
  }

  element.classList.remove(className);
  return element;
}

/**
 * @param clas - Classname to be added to the specified html element.
 */
const addClass = (element, className) => element.classList.add(className);

/**
 * @param ele - HTML element
 * @param clas - Classname to be added to the specified html element.
 */
const toggleClass = (element, className) => element.classList.toggle(className);

/**
 * Query the DOM for specified element and return it.
 * @param {element} ele
 * @returns {HTMLElement}
 */
const getElement = (element) => document.querySelector(`${element}`);

/**
 * Return all element that has the specified classname or element name
 * @param {*} ele
 * @returns {HTMLCollection}
 */
const getElementAll = (element) => document.querySelectorAll(`${element}`);

/**
 * Reset all input element to default value;
 * @param {formElements} form
 */
function resetForm(formElements) {
  formElements.forEach((element) => {
    if (
      element.type === "text" ||
      element.type === "textarea" ||
      element.type === "password"
    ) {
      element.value = "";
    } else if (element.type === "checkbox" || element.type === "radio") {
      element.checked = false;
    } else if (element.type === "select") {
      element.selectedIndex = 0;
    }
  });
}

/**
 * Generating random colors for user's friends
 */
function frdBgColor() {
  const randomColor = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 256)
  );
  return `rgb(${randomColor.join(", ")})`;
}

/**
 * Redirecting user's to different pages.
 */
function redirect(page, id) {
  const active = localStorage.getItem("active");

  if (active) {
    localStorage.removeItem("active");
    localStorage.removeItem("account");
  } else {
    localStorage.setItem("active", "true");
    localStorage.setItem("account", JSON.stringify(id));
  }

  // Reload page
  location.replace(page);
}
