document.addEventListener("click", (event) => {
  event.preventDefault();
  const targetEl = event.target;
  const targetElClas = Array.from(targetEl.classList);

  // Toggling forms
  if (targetElClas.includes("sign-up")) {
    toggleForms("sign-up-form");
  }
  if (targetElClas.includes("sign-in")) {
    toggleForms("sign-in-form");
  }
  if (targetElClas.includes("reset-password")) {
    toggleForms("reset-password-form");
  }
  if (targetElClas.includes("submit-btn")) {
    submitForm(targetEl);
  }
  if (targetElClas.includes("show-password")) {
    togglePasswordVisibility(targetEl, "hide");
  }
  if (targetElClas.includes("hide-password")) {
    togglePasswordVisibility(targetEl, "show");
  }
});

/**
 * Toggles the visibility of the password and visibility icon in a password input field.
 *
 * @param {Element} element - The element containing the password input field and the visibility icon.
 * @param {string} className - The CSS class name used to identify the visibility icon.
 */
function togglePasswordVisibility(element, className) {
  const inputElement = element.closest(".form-group").querySelector("input");

  // Toggle the input type between "password" and "text"
  inputElement.type = inputElement.type === "password" ? "text" : "password";

  const visibleSvg = element;
  const hiddenSvg = element
    .closest(".form-group")
    .querySelector(`.${className}-password`);

  toggleVisibility(visibleSvg);
  toggleVisibility(hiddenSvg);
}

const forms = {
  "sign-in-form": `
          <div class="form-group form-title">
            <h3>Sign In</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 512 512"
            >
              <path
                d="M192,176V136a40,40,0,0,1,40-40H392a40,40,0,0,1,40,40V376a40,40,0,0,1-40,40H240c-22.09,0-48-17.91-48-40V336"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
              <polyline
                points="288 336 368 256 288 176"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
              <line
                x1="80"
                y1="256"
                x2="352"
                y2="256"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
            </svg>
          </div>

          <div class="form-group message hide"></div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="form-group-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <rect
                  x="48"
                  y="96"
                  width="416"
                  height="320"
                  rx="40"
                  ry="40"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <polyline
                  points="112 160 256 272 400 160"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
              </svg>

              <input autofocus
                class="email"
                type="email"
                name="email"
                placeholder="Username@gmail.com"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="form-group-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  d="M336,208V113a80,80,0,0,0-160,0v95"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <rect
                  x="96"
                  y="208"
                  width="320"
                  height="272"
                  rx="48"
                  ry="48"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
              </svg>

              <input
                id="password"
                class="password"
                type="password"
                name="password"
                placeholder="············"
              />

              <!-- SHOW PASSWORD -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
                class="hide show-password"
              >
                <path
                  d="M432,448a15.92,15.92,0,0,1-11.31-4.69l-352-352A16,16,0,0,1,91.31,68.69l352,352A16,16,0,0,1,432,448Z"
                />
                <path
                  d="M255.66,384c-41.49,0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91l0-.08c19.94-28.57,41.78-52.73,65.24-72.21a2,2,0,0,0,.14-2.94L93.5,161.38a2,2,0,0,0-2.71-.12c-24.92,21-48.05,46.76-69.08,76.92a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.4,76.14,98.28,100.65C162,402,207.9,416,255.66,416a239.13,239.13,0,0,0,75.8-12.58,2,2,0,0,0,.77-3.31l-21.58-21.58a4,4,0,0,0-3.83-1A204.8,204.8,0,0,1,255.66,384Z"
                />
                <path
                  d="M490.84,238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.66,96a227.34,227.34,0,0,0-74.89,12.83,2,2,0,0,0-.75,3.31l21.55,21.55a4,4,0,0,0,3.88,1A192.82,192.82,0,0,1,255.66,128c40.69,0,80.58,12.43,118.55,37,34.71,22.4,65.74,53.88,89.76,91a.13.13,0,0,1,0,.16,310.72,310.72,0,0,1-64.12,72.73,2,2,0,0,0-.15,2.95l19.9,19.89a2,2,0,0,0,2.7.13,343.49,343.49,0,0,0,68.64-78.48A32.2,32.2,0,0,0,490.84,238.6Z"
                />
                <path
                  d="M256,160a95.88,95.88,0,0,0-21.37,2.4,2,2,0,0,0-1,3.38L346.22,278.34a2,2,0,0,0,3.38-1A96,96,0,0,0,256,160Z"
                />
                <path
                  d="M165.78,233.66a2,2,0,0,0-3.38,1,96,96,0,0,0,115,115,2,2,0,0,0,1-3.38Z"
                />
              </svg>

              <!-- HIDE PASSWORD -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
                class="hide-password"
              >
                <path
                  d="M255.66,112c-77.94,0-157.89,45.11-220.83,135.33a16,16,0,0,0-.27,17.77C82.92,340.8,161.8,400,255.66,400,348.5,400,429,340.62,477.45,264.75a16.14,16.14,0,0,0,0-17.47C428.89,172.28,347.8,112,255.66,112Z"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <circle
                  cx="256"
                  cy="256"
                  r="80"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-miterlimit: 10;
                    stroke-width: 32px;
                  "
                />
              </svg>
            </div>
          </div>
          <button class="submit-btn">Submit</button>
          <footer>
            <span class="sign-up">Sign Up</span>
            <span class="reset-password">Forgot Password?</span>
          </footer>
  `,
  "sign-up-form": `
          <div class="form-group form-title">
            <h3>SIGN UP</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 512 512"
            >
              <path
                d="M192,176V136a40,40,0,0,1,40-40H392a40,40,0,0,1,40,40V376a40,40,0,0,1-40,40H240c-22.09,0-48-17.91-48-40V336"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
              <polyline
                points="288 336 368 256 288 176"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
              <line
                x1="80"
                y1="256"
                x2="352"
                y2="256"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
            </svg>
          </div>

          <div class="form-group message hide"></div>

          <div class="form-group">
            <label for="fullname">Full Name</label>
            <div class="form-group-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
              >
                <path
                  d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <path
                  d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-miterlimit: 10;
                    stroke-width: 32px;
                  "
                />
              </svg>

              <input
                autofocus
                class="fullname"
                type="text"
                name="fullname"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="form-group-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <rect
                  x="48"
                  y="96"
                  width="416"
                  height="320"
                  rx="40"
                  ry="40"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 20px;
                  "
                />
                <polyline
                  points="112 160 256 272 400 160"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 20px;
                  "
                />
              </svg>
              <input
                class="email"
                type="email"
                name="email"
                placeholder="Username@gmail.com"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="form-group-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  d="M336,208V113a80,80,0,0,0-160,0v95"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <rect
                  x="96"
                  y="208"
                  width="320"
                  height="272"
                  rx="48"
                  ry="48"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
              </svg>

              <input
                class="password"
                type="password"
                name="password"
                placeholder="························"
              />

              <!-- SHOW PASSWORD -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
                class="hide show-password"
              >
                <path
                  d="M432,448a15.92,15.92,0,0,1-11.31-4.69l-352-352A16,16,0,0,1,91.31,68.69l352,352A16,16,0,0,1,432,448Z"
                />
                <path
                  d="M255.66,384c-41.49,0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91l0-.08c19.94-28.57,41.78-52.73,65.24-72.21a2,2,0,0,0,.14-2.94L93.5,161.38a2,2,0,0,0-2.71-.12c-24.92,21-48.05,46.76-69.08,76.92a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.4,76.14,98.28,100.65C162,402,207.9,416,255.66,416a239.13,239.13,0,0,0,75.8-12.58,2,2,0,0,0,.77-3.31l-21.58-21.58a4,4,0,0,0-3.83-1A204.8,204.8,0,0,1,255.66,384Z"
                />
                <path
                  d="M490.84,238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.66,96a227.34,227.34,0,0,0-74.89,12.83,2,2,0,0,0-.75,3.31l21.55,21.55a4,4,0,0,0,3.88,1A192.82,192.82,0,0,1,255.66,128c40.69,0,80.58,12.43,118.55,37,34.71,22.4,65.74,53.88,89.76,91a.13.13,0,0,1,0,.16,310.72,310.72,0,0,1-64.12,72.73,2,2,0,0,0-.15,2.95l19.9,19.89a2,2,0,0,0,2.7.13,343.49,343.49,0,0,0,68.64-78.48A32.2,32.2,0,0,0,490.84,238.6Z"
                />
                <path
                  d="M256,160a95.88,95.88,0,0,0-21.37,2.4,2,2,0,0,0-1,3.38L346.22,278.34a2,2,0,0,0,3.38-1A96,96,0,0,0,256,160Z"
                />
                <path
                  d="M165.78,233.66a2,2,0,0,0-3.38,1,96,96,0,0,0,115,115,2,2,0,0,0,1-3.38Z"
                />
              </svg>

              <!-- HIDE PASSWORD -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
                class="hide-password"
              >
                <path
                  d="M255.66,112c-77.94,0-157.89,45.11-220.83,135.33a16,16,0,0,0-.27,17.77C82.92,340.8,161.8,400,255.66,400,348.5,400,429,340.62,477.45,264.75a16.14,16.14,0,0,0,0-17.47C428.89,172.28,347.8,112,255.66,112Z"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <circle
                  cx="256"
                  cy="256"
                  r="80"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-miterlimit: 10;
                    stroke-width: 32px;
                  "
                />
              </svg>
            </div>
            <span class="info">
              At least 4 characters, contain letters (UPPERCASE, LOWERCASE),
              numbers, and symbols.
            </span>
          </div>

          <button class="submit-btn">Submit</button>
          <footer>
            <span class="sign-in">Sign In</span>
            <span class="reset-password">Forgot Password?</span>
          </footer>
  `,
  "reset-password-form": `
          <div class="form-group form-title">
            <h3>RESET PASSWORD</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 512 512"
            >
              <path
                d="M192,176V136a40,40,0,0,1,40-40H392a40,40,0,0,1,40,40V376a40,40,0,0,1-40,40H240c-22.09,0-48-17.91-48-40V336"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
              <polyline
                points="288 336 368 256 288 176"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
              <line
                x1="80"
                y1="256"
                x2="352"
                y2="256"
                style="
                  fill: none;
                  stroke: #000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 32px;
                "
              />
            </svg>
          </div>

          <div class="form-group message hide"></div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="form-group-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <rect
                  x="48"
                  y="96"
                  width="416"
                  height="320"
                  rx="40"
                  ry="40"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 20px;
                  "
                />
                <polyline
                  points="112 160 256 272 400 160"
                  style="
                    fill: none;
                    stroke: #000;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 20px;
                  "
                />
              </svg>
              <input
                autofocus
                class="email"
                type="email"
                name="email"
                placeholder="Username@gmail.com"
              />
            </div>
          </div>

          <button class="submit-btn">Submit</button>
          <footer><span class="sign-in">Sign In</span><span></span></footer>
  `,
};

/**
 * Toggles the visibility of a specific form based on the provided class name.
 *
 * @param {string} className - The class name of the form to toggle.
 */
function toggleForms(className) {
  const form = getElement(`form`);
  form.classList = className;
  form.innerHTML = forms[className];
}

toggleForms("sign-in-form");

/**
 * Displays a warning message with the specified content, class name, and background color. The message will be automatically hidden after 10 seconds.
 *
 * @param {string} message - The message text to display.
 * @param {string} className - The CSS class name to apply to the warning message element.
 * @param {string} backgroundColor - The background color to apply to the warning message container.
 */
function warning(message, className, backgroundColor) {
  const warningMessageContainer = getElement(".message");

  warningMessageContainer.innerHTML = `<span class="${className}">${message}</span>`;
  warningMessageContainer.style.backgroundColor = backgroundColor;
  removeClass(warningMessageContainer, "hide");
}
