const { fullname } = JSON.parse(localStorage.getItem("account"));
const user = element(".profile span");
let FREINDS, MESSAGES;

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

// Validate if user has successfully logged in before accessing chat page-90
window.onload = () => {
  chatted();
  if (location.pathname === "/chat.html") {
    const active = localStorage.getItem("active");
    if (!active) {
      location.replace("/");
    }
  }
};

// const user_initial = element(".profile span");
const user_initial = () => {
  const initial = fullname.split(" ");
  return `${initial[0][0]}${initial[initial.length - 1][0]}`;
};

user.innerText = user_initial();

/**
 * Display friends the user has chatted with.
 */
const chatted = async () => {
  FREINDS = await get_user();
  const chat_section = element(".chat-section");

  FREINDS.forEach((info) => {
    const frd = `<div class="chat-content" data-id="${info.id}">
          <div class="chat-info">
            <span class="chat-initial">
              ${user_initial()}
              <span class="chat-status"></span>
            </span>
            <div class="chat-detail">
              <span class="chat-name">${info.fullname}</span>
              <span class="chat-latest-msg"
                >The quick brown fox jump over .....</span
              >
            </div>
          </div>
          <div class="chat-time">
            <span>12:21 pm</span>
          </div>
        </div>`;
    chat_section.insertAdjacentHTML("beforeend", frd);
  });
  console.log(FREINDS);
};

const display_friends = () => {};
