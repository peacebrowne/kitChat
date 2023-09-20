/**
 * Removes a class from an html element
 * @param {*} ele
 * @param {*} clas
 * @returns HTMLElement
 */
const remove_class = (ele, clas) => {
  ele.classList.remove(clas);
  return ele;
};

/**
 * @param clas - Class to be added to the specified html element.
 */
const add_class = (ele, clas) => ele.classList.add(clas);

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
const reset = (form) => {
  form.forEach((input) => {
    input.value = "";
  });
};
