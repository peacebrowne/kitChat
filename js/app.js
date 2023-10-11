const profile = JSON.parse(localStorage.getItem("account"));
const user = element(".profile span");
let FREINDS, MESSAGES;
const section = element(".section");
const search = element("#search");

// Validate if user has successfully logged in before accessing chat page-90
window.addEventListener("load", () => {
  SECTIONS["chat"]();
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
  if (targetElClas.includes("nav-item")) {
    toggleSections(targetEl);
  } else if (targetEl.closest(".nav-item")) {
    toggleSections(targetEl.closest(".nav-item"));
  }

  // LOGGING USER OUT
  if (targetElClas.includes("logout")) logOut(targetElClas);
});

/**
 * Switching Section.
 * @param {class} ele - Current form to display
 */
function toggleSections(ele, clas) {
  const currentSection = element(".active-section");
  const nextSection = ele;

  toggleClass(currentSection, "active-section");
  toggleClass(nextSection, "active-section");

  const sectionTitle = element(".section-title h2");
  sectionTitle.innerText = nextSection.innerText;
  section.innerHTML = "";
  SECTIONS[nextSection.innerText.toLowerCase()]();
}

function userInitial(name) {
  const initial = name.split(" ");
  return `${initial[0][0]}${initial[initial.length - 1][0]}`;
}

user.innerText = userInitial(profile.fullname);

// Logging user out
const logOut = (clas) => redirect("/");

/**
 * Display sections.
 */

const SECTIONS = {
  chat: async () => {
    FREINDS = await getUser();
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
  },
  friends: async () => {
    FREINDS = await getUser();
    FREINDS.reverse().forEach((info) => {
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
  },
};

/**
 * Searches for a friend in the chat and friends section.
 * if friends is available display it else hide it
 * @param {*} ev - Keyboard keys
 * @returns {void}
 */
function searchFriends(ev) {
  const char = ev.target.value.toLocaleLowerCase();

  Array.from(section.children).forEach((ele) => {
    const term = ele.querySelector(".chat-name").innerText.toLocaleLowerCase();
    if (term.includes(char)) {
      removeClass(ele, "hide");
    } else {
      addClass(ele, "hide");
    }
  });
}
search.addEventListener("keyup", searchFriends);
