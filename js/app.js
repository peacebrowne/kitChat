const profile = JSON.parse(localStorage.getItem("account"));
const user = element(".profile span");
let FREINDS, MESSAGES;

// Validate if user has successfully logged in before accessing chat page-90
window.addEventListener("load", () => {
  chat_section();
  if (location.pathname === "/chat.html") {
    const active = localStorage.getItem("active");
    if (!active) {
      location.replace("/");
    }
  }
});

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

  // TOGGLING SECTIONS
  // targetElClas.includes("nav-item")
  //   ? console.log(targetEl, "included")
  //   : console.log(targetEl, "not included");

  // LOGGING USER OUT
  if (targetElClas.includes("logout")) log_out(targetElClas);
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

/**
 * Display friends the user has previously chattd with.
 */
async function chat_section() {
  FREINDS = await get_user();
  const chat_section = element(".chat-section");

  FREINDS.forEach((info) => {
    const frd = `<div class="chat-content" data-id="${info.id}">
          <div class="chat-info">
            <span class="chat-initial" style="background-color: rgb(${frd_bg_color()}) ">
              ${user_initial(info.fullname)}
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
    if (profile.email != info.email)
      chat_section.insertAdjacentHTML("beforeend", frd);
  });
}

/**
 * Display all user's friends.
 */
async function friends_section() {
  FREINDS = await get_user();
  const chat_section = element(".chat-section");

  FREINDS.forEach((info) => {
    const frd = `<div class="chat-content" data-id="${info.id}">
          <div class="chat-info">
            <span class="chat-initial" style="background-color: rgb(${frd_bg_color()}) ">
              ${user_initial(info.fullname)}
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
    if (profile.email != info.email)
      chat_section.insertAdjacentHTML("beforeend", frd);
  });
}

// const user_initial = element(".profile span");
function user_initial(name) {
  const initial = name.split(" ");
  return `${initial[0][0]}${initial[initial.length - 1][0]}`;
}

user.innerText = user_initial(profile.fullname);

// Logging user out
const log_out = (clas) => redirect("/");
