/**
 * @param clas - Class to remove from the specified html element.
 */
const remove_class = (ele,clas) => {
    ele.classList.remove(clas);
    return ele;
}

/**
 * @param clas - Class to be added to the specified html element.
 */
const add_class = (ele,clas) => ele.classList.add(clas);

/**
 * @param {HTMLElement} ele - Query the DOM for specified element and return it.
 */
const element = ele => {
    return document.querySelector(`${ele}`)
}

/**
 * @param {HTMLElement} ele - Query the DOM for all specified elements and return it.
 */
const elementAll = ele => {
    return document.querySelectorAll(`${ele}`)
}

const reset = form => {
    form.forEach(input => {
        input.value = ''
    });
}
