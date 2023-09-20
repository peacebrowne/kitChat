const form = element("form");

document.addEventListener("click", (ev) => {
  ev.preventDefault();
  const targetEl = ev.target;
  const targetElClas = Array.from(targetEl.classList);

  // Toggling formsi
  if (targetElClas.includes("sign-up")) {
    toggle_forms(targetEl, "sign-up");
  }
  if (targetElClas.includes("sign-in")) {
    toggle_forms(targetEl, "sign-in");
  }
  if (targetElClas.includes("reset-password")) {
    toggle_forms(targetEl, "reset-password");
  }
  if (targetElClas.includes("submit-btn")) {
    submit_form(targetEl);
  }
  if (targetElClas.includes("show-password")) {
    show_hide_password(targetEl, "hide");
  }
  if (targetElClas.includes("hide-password")) {
    show_hide_password(targetEl, "show");
  }
});

/**
 * Display a form base on user preference. Login or Registration.
 * @param {class} ele - Current form to display
 */
function toggle_forms(ele, clas) {
  const current_form = ele.closest("form");
  const next_form = element(`.${clas}-form`);

  const inputs = elementAll(`.${current_form.className} input`);
  reset(inputs);

  add_class(current_form, "hide");
  remove_class(next_form, "hide");
}

/**
 * Display a form base on user preference. Login or Registration.
 * @param {class} ele - Current password svg element
 * @param {class} clas - Hidden password svg class
 */
function show_hide_password(ele, clas) {
  const input = ele.closest(".form-group").querySelector("input");
  input.type = input.type === "password" ? "text" : "password";

  const visible_svg = ele;
  const hidden_svg = ele
    .closest(".form-group")
    .querySelector(`.${clas}-password`);

  add_class(visible_svg, "hide");
  remove_class(hidden_svg, "hide");
}
