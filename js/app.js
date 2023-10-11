const profile = JSON.parse(localStorage.getItem("account"));
const user = element(".profile span");
let FREINDS, MESSAGES;

// Validate if user has successfully logged in before accessing chat page-90
window.addEventListener("load", () => {
  chatSection();
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
    ? toggleClass(element(".dropdown-menu"), "show")
    : removeClass(element(".dropdown-menu"), "show");

  // TOGGLE SIDEBAR NAV
  targetElClas.includes("hambuger")
    ? toggleClass(element(".sidebar"), "slide-left")
    : removeClass(element(".sidebar"), "slide-left");

  // TOGGLING SECTIONS
  // targetElClas.includes("nav-item")
  //   ? console.log(targetEl, "included")
  //   : console.log(targetEl, "not included");

  // LOGGING USER OUT
  if (targetElClas.includes("logout")) logOut(targetElClas);
});

/**
 * Display a form base on user preference. Login or Registration.
 * @param {class} ele - Current form to display
//  */
// function toggleSections(ele, clas) {
//   const currentSection = ele.closest("form");
//   const nextSection = element(`.${clas}-form`);

//   const inputs = elementAll(`.${currentSection.className} input`);
//   // resetForm(inputs);

//   addClass(currentSection, "hide");
//   removeClass(nextSection, "hide");
// }

/**
 * Display friends the user has previously chattd with.
 */
async function chatSection() {
  FREINDS = await getUser();
  const section = element(".chat-section");

  FREINDS.forEach((info) => {
    const frd = `<div class="chat-content" data-id="${info.id}">
          <div class="chat-info">
            <span class="chat-initial" style="background-color: rgb(${frdBgColor()}) ">
              ${userInitial(info.fullname)}
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
      section.insertAdjacentHTML("beforeend", frd);
  });
}

/**
 * Display all user's friends.
 */
async function friendsSection() {
  FREINDS = await getUser();
  const section = element(".chat-section");

  FREINDS.forEach((info) => {
    const frd = `<div class="chat-content" data-id="${info.id}">
          <div class="chat-info">
            <span class="chat-initial" style="background-color: rgb(${frdBgColor()}) ">
              ${userInitial(info.fullname)}
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
      section.insertAdjacentHTML("beforeend", frd);
  });
}

function userInitial(name) {
  const initial = name.split(" ");
  return `${initial[0][0]}${initial[initial.length - 1][0]}`;
}

user.innerText = userInitial(profile.fullname);

// Logging user out
const logOut = (clas) => redirect("/");
