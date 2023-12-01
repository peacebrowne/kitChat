const USERID = JSON.parse(localStorage.getItem("account"));
const user = getElement(".profile span");
const search = getElement("#search");
const userSection = getElement(".user-section");
let FRIENDS, MESSAGES, USERINFO, FRDEMAIL, FRDID;

// Validate if user has successfully logged in before accessing chat page-90
window.addEventListener("load", async () => {
  if (location.pathname === "/chat.html") {
    const active = localStorage.getItem("active");
    if (!active) {
      location.replace("/");
    }
    FRIENDS = await getUser();
    USERINFO = FRIENDS.find((frd) => frd.id === USERID);
    SECTIONS["chat"]();
  }
});

// HANDLES ALL CLICK EVENT ON THE PAGE
document.addEventListener("click", (ev) => {
  const targetEl = ev.target;
  const targetElClas = Array.from(targetEl.classList);

  // TOGGLE USER PROFILE
  targetElClas.includes("profile-item")
    ? toggleClass(getElement(".dropdown-menu"), "show")
    : removeClass(getElement(".dropdown-menu"), "show");

  // TOGGLE SIDEBAR NAV
  targetElClas.includes("hambuger")
    ? toggleClass(getElement(".sidebar"), "slide-left")
    : removeClass(getElement(".sidebar"), "slide-left");

  // TOGGLING SECTIONS
  if (targetElClas.includes("nav-item") || targetEl.closest(".nav-item")) {
    toggleTabs(
      targetElClas.includes("nav-item")
        ? targetEl
        : targetEl.closest(".nav-item")
    );
  }

  // LOGGING USER OUT
  if (targetElClas.includes("logout")) logOut(targetElClas);

  // SEARCHING
  if (targetElClas.includes("search")) {
    const search = getElement("#search");
    search.addEventListener("keyup", searchFriends);
  }

  // OPEN CHAT
  if (targetElClas.includes("chat-content")) SECTIONS["openChat"](targetEl);
  else if (targetEl.closest(".chat-content"))
    SECTIONS["openChat"](targetEl.closest(".chat-content"));

  // COMPOSE MESSAGES
  if (targetElClas.includes("send-msg")) composeMessage();

  // BACK ARROW
  if (targetElClas.includes("back-arrow")) backArrow(targetEl);
});

/**
 * Switching Tabs.
 * @param { HTMLElement } tab - Current tab to display
 */
function toggleTabs(tab) {
  const currentTab = getElement(".active-tab");
  const nextTab = tab;

  toggleClass(currentTab, "active-tab");
  toggleClass(nextTab, "active-tab");

  SECTIONS[nextTab.innerText.toLowerCase()]();
  socket.emit("user", USERID);
}

/**
 * Extracting the first letter of the user first and last name and returning user initial.
 * @param { String } name - User fullname
 * @returns { String }  - User initial
 */
function userInitial(name) {
  const initial = name.split(" ");
  return `${initial[0][0]}${initial[initial.length - 1][0]}`;
}

// OPEN SECTIONS
const SECTIONS = {
  chat: async () => {
    FRIENDS = await getUser();
    openSections(FRIENDS, "chats");
  },
  friends: async () => {
    FRIENDS = await getUser();
    openSections(FRIENDS.reverse(), "friends");
  },
  previousMessages: async (msg) => {
    previousMessages(msg);
  },
  openChat: async (ele) => {
    openChat(ele);
  },
};

/**
 * Display friends in user chat or friend section.
 * @param { Object } friends - User friend object
 * @returns {void}
 */
function displayFriends(friends, title) {
  const sectionElement = document.querySelector(".tab-section");
  friends.forEach((friend) => {
    if (friend.id !== USERID) {
      const friendTemplate = `
        <div class="chat-content" data-id="${friend.id}">
          <div class="chat-info">
            <span class="chat-initial" style="background-color: ${
              friend.color
            }">
              ${userInitial(friend.fullname)}
              <span class="${title == "chats" ? "chat-status" : ""}"></span>
            </span>
            <div class="chat-detail">
              <span class="chat-name">${friend.fullname}</span>
              <span class="chat-latest-msg"></span>
            </div>
          </div>
          <div class="chat-time">
            <span>12:21 pm</span>
          </div>
        </div>`;
      sectionElement.insertAdjacentHTML("beforeend", friendTemplate);
    }
  });
}

/**
 * Open user section between chat and friends section.
 * @param { Array } friends - All user friends
 * @param { String } title - Title of the section.
 */
function openSections(friends, title) {
  const userSection = getElement(".user-section");
  const section = `<nav class="navbar-top" id="navbarTop">
          <div class="hambuger-menu hambuger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="hambuger"
            >
              <path
                d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z"
              />
            </svg>
          </div>

          <div class="section-title">
            <h2>${title}</h2>
          </div>
          <div class="search">
            <div class="search-box">
              <input
                type="text"
                placeholder="Search..."
                name=""
                id="search"
                class="search"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="search">
                <path
                  d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"
                />
              </svg>
            </div>
          </div>

          <ul class="navbar-top-user">
            <li
              class="profile profile-item dropdown pe-2 d-flex align-items-center"
              style="background-color: ${USERINFO.color}"
            >
              <span class="profile-item">${userInitial(
                USERINFO.fullname
              )}</span>
              <ul class="dropdown-menu">
                 <li class="logout" id="logout">
              <div class="nav-link logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="logout"
              >
                <path
                  class="logout"
                  d="M312 372c-7.7 0-14 6.3-14 14 0 9.9-8.1 18-18 18H94c-9.9 0-18-8.1-18-18V126c0-9.9 8.1-18 18-18h186c9.9 0 18 8.1 18 18 0 7.7 6.3 14 14 14s14-6.3 14-14c0-25.4-20.6-46-46-46H94c-25.4 0-46 20.6-46 46v260c0 25.4 20.6 46 46 46h186c25.4 0 46-20.6 46-46 0-7.7-6.3-14-14-14z"
                />
                <path
                  class="logout"
                  d="M372.9 158.1c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-5.5 5.5-5.5 14.3 0 19.8l65.2 64.2H162c-7.7 0-14 6.3-14 14s6.3 14 14 14h256.6L355 334.2c-5.4 5.4-5.4 14.3 0 19.8l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.8 0 7.3-1.4 9.9-4.1l82.6-82.4c4.3-4.3 6.5-9.3 6.5-14.7 0-5.3-2.3-10.3-6.5-14.5l-84.5-84.2z"
                />
              </svg>
              <span class="nav-link-text">Logout</span>
            </div>
          </li>                
              </ul>
            </li>
          </ul>
        </nav>
        <hr class="horizontal" />

        <!-- SECTION -->
        <div class="tab-section"></div>`;

  userSection.innerHTML = section;
  displayFriends(friends, title);
}

/**
 * Open chat section between user and friend.
 * @param { Object }  frd - Current friend object
 * @returns {void}
 */
async function openChat(frd) {
  FRDID = frd.dataset.id;

  const friend = FRIENDS.find((frd) => frd.id === FRDID);
  FRDEMAIL = friend.email;

  const section = ` <header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="back-arrow"
          >
            <path
              d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"
            />
          </svg>
          <div class="section-title">
            <div class="chat-info">
              <span class="chat-initial" style="background-color: ${
                friend.color
              }">
                ${userInitial(friend.fullname)}
                <span class="chat-status"></span>
              </span>
              <div class="chat-detail">
                <span class="chat-name">${friend.fullname}</span>
              </div>
            </div>
          </div>

          <div class="header-calls">
            <!-- SEARCH MESSAGE -->
            <div class="search">
              <div class="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  name=""
                  id="search"
                  class="search"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"
                  />
                </svg>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="video"
            >
              <path
                d="M450.6 153.6c-3.3 0-6.5.9-9.3 2.7l-86.5 54.6c-2.5 1.6-4 4.3-4 7.2v76c0 2.9 1.5 5.6 4 7.2l86.5 54.6c2.8 1.7 6 2.7 9.3 2.7h20.8c4.8 0 8.6-3.8 8.6-8.5v-188c0-4.7-3.9-8.5-8.6-8.5h-20.8zM273.5 384h-190C55.2 384 32 360.8 32 332.6V179.4c0-28.3 23.2-51.4 51.4-51.4h190c28.3 0 51.4 23.2 51.4 51.4v153.1c.1 28.3-23 51.5-51.3 51.5z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="phone"
            >
              <path
                d="M436.9 364.8c-14.7-14.7-50-36.8-67.4-45.1-20.2-9.7-27.6-9.5-41.9.8-11.9 8.6-19.6 16.6-33.3 13.6-13.7-2.9-40.7-23.4-66.9-49.5-26.2-26.2-46.6-53.2-49.5-66.9-2.9-13.8 5.1-21.4 13.6-33.3 10.3-14.3 10.6-21.7.8-41.9C184 125 162 89.8 147.2 75.1c-14.7-14.7-18-11.5-26.1-8.6 0 0-12 4.8-23.9 12.7-14.7 9.8-22.9 18-28.7 30.3-5.7 12.3-12.3 35.2 21.3 95 27.1 48.3 53.7 84.9 93.2 124.3l.1.1.1.1c39.5 39.5 76 66.1 124.3 93.2 59.8 33.6 82.7 27 95 21.3 12.3-5.7 20.5-13.9 30.3-28.7 7.9-11.9 12.7-23.9 12.7-23.9 2.9-8.1 6.2-11.4-8.6-26.1z"
              />
            </svg>
          </div>
        </header>
        <hr class="horizontal" />
        <div class="conversation">
          <ul class="messages">
           
          </ul>
        </div>
        </div>

        <!-- COMPOSED MESSAGE -->
        <form class="compose">
          <div class="form-group">
              <input
                class="compose-msg"
                type="text"
                name="msg"
                placeholder="Enter your message..."
              />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="send-msg"
          >
            <path
              d="M435.9 64.9l-367.1 160c-6.5 3.1-6.3 12.4.3 15.3l99.3 56.1c5.9 3.3 13.2 2.6 18.3-1.8l195.8-168.8c1.3-1.1 4.4-3.2 5.6-2 1.3 1.3-.7 4.3-1.8 5.6L216.9 320.1c-4.7 5.3-5.4 13.1-1.6 19.1l64.9 104.1c3.2 6.3 12.3 6.2 15.2-.2L447.2 76c3.3-7.2-4.2-14.5-11.3-11.1z"
            />
          </svg>
        </form>`;
  userSection.innerHTML = section;
  const messages = await getMessage(FRDID, USERID);
  SECTIONS["previousMessages"](messages);
  activeUser([{ id: FRDID }]);
}

/**
 * Searches for a friend in the chat and friends section.
 * if friends is available display it else hide it
 * @param {KeyboardEvent} ev - Keyboard keys
 * @returns {void}
 */
function searchFriends(ev) {
  const char = ev.target.value.toLocaleLowerCase();
  const tabSection = getElement(".tab-section");

  Array.from(tabSection.children).forEach((ele) => {
    const term = ele.querySelector(".chat-name").innerText.toLocaleLowerCase();
    if (term.includes(char)) {
      removeClass(ele, "hide");
    } else {
      addClass(ele, "hide");
    }
  });
}

// GO BACK TO CHAT SECTION
const backArrow = () => {
  SECTIONS["chat"]();
  socket.emit("user", USERID);
};

// LOG USER OUT
const logOut = () => redirect("/");
