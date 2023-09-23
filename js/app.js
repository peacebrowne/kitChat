// HANDLES ALL CLICK EVENT ON THE PAGE
document.addEventListener("click", (ev) => {
  const targetEl = ev.target;
  const targetElClas = Array.from(targetEl.classList);

  // TOGGLE USER PROFILE
  targetElClas.includes("profile-item")
    ? toggle_class(element(".dropdown-menu"), "show")
    : remove_class(element(".dropdown-menu"), "show");

  // TOGGLE SIDEBAR NAV
  targetElClas.includes("hambuger")
    ? toggle_class(element(".sidebar"), "slide-left")
    : remove_class(element(".sidebar"), "slide-left");

  // SWITCHING SECTIONS
  targetElClas.includes("nav-item")
    ? console.log(targetEl, "included")
    : console.log(targetEl, "not included");
});

/**
 * Display a form base on user preference. Login or Registration.
 * @param {class} ele - Current form to display
 */
function toggle_Sections(ele, clas) {
  const current_form = ele.closest("form");
  const next_form = element(`.${clas}-form`);

  const inputs = elementAll(`.${current_form.className} input`);
  reset(inputs);

  add_class(current_form, "hide");
  remove_class(next_form, "hide");
}
