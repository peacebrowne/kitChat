const form = element("form");

document.addEventListener("click", (ev) => {
	ev.preventDefault();
	const targetEl = ev.target;
	const targetElClas = Array.from(targetEl.classList);

	// Toggling forms
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
