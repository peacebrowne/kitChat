/**
 * Displays the conversation history between the current user and the specified friend.
 *
 * @param {Array} messages - An array of message objects representing the conversation history.
 */
function previousMessages(messages) {
  const messagesContainer = getElement(".messages");
  const messageTemplate = (message) =>
    message.from !== USERID
      ? `<div class="msg received-msg">
          <div class="msg-bubble">
            <div class="msg-text">
              ${message.message}
              </div>
              <span class="msg-time"> ${message.hour}: ${message.minute}</span>
            </div>
          </div>`
      : `<div class="msg sent-msg">
          <div class="msg-bubble">
            <div class="msg-text">
              ${message.message}
            </div>
            <span class="msg-time"> ${message.hour}: ${message.minute}</span>
          </div>
        </div>`;
  messages.forEach((message) =>
    messagesContainer.insertAdjacentHTML("beforeend", messageTemplate(message))
  );
}

/**
 * Composing user message and display it.
 * @returns {void}
 */
function composeMessage() {
  const messageInput = getElement(".compose-msg");
  const messageContent = messageInput.value.trim();

  if (!messageContent) {
    return;
  }

  const date = new Date();
  const fullDate = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };

  sendMessage(messageContent, USERID, FRDID, fullDate);
  resetForm([messageInput]);
}

/**
 * Display instant messages between user and specified friend.
 *
 * @param {Object} currentMessage - A message object representing the currnet message.
 */

function instantMessage(currentMessage) {
  const messagesContainer = getElement(".messages");
  if (messagesContainer) {
    const messageTemplate =
      currentMessage.from !== USERID
        ? `<div class="msg received-msg">
            <div class="msg-bubble">
              <div class="msg-text">
                ${currentMessage.message}
              </div>
              <span class="msg-time"> 
                ${currentMessage.date.hour}: ${currentMessage.date.minute} 
              </span>
            </div>
          </div>`
        : `<div class="msg sent-msg">
            <div class="msg-bubble">
              <div class="msg-text">
                ${currentMessage.message}
              </div>
              <span class="msg-time">
                ${currentMessage.date.hour}: ${currentMessage.date.minute} 
              </span>
            </div>
          </div>`;
    messagesContainer.insertAdjacentHTML("beforeend", messageTemplate);
  } else {
    const friendZone = getElement(".tab-section");
    const friend = FRIENDS.find((friend) => friend.id === currentMessage.from);
    const friendElement = Array.from(friendZone.children).find(
      (element) => element.dataset.id === friend.id
    );
    const latestMessageElement =
      friendElement.querySelector(".chat-latest-msg");
    latestMessageElement.innerText = currentMessage.message;
    friendZone.insertBefore(friendElement, friendZone.firstChild);
  }
}

const activeUser = (data) => {
  setTimeout(() => {
    const friendZone = getElement(".current-section");
    const friendsList = [];

    const filteredData = data.filter((user) => user.id !== USERID);
    filteredData.forEach((user) => {
      FRIENDS.forEach((friend) => {
        if (friend.id === user.id) {
          friendsList.push(friend.id);
        }
      });
    });

    friendsList.forEach((id) => {
      const userElement = friendZone.querySelector(`[data-id="${id}"]`);
      if (userElement) {
        const chatStatusElement = userElement.querySelector(".chat-status");
        if (chatStatusElement) {
          chatStatusElement.style.backgroundColor = "#82d616";
        }
      }
    });
  }, 100);
};

const disconnectedUser = (data) => {
  const friendZone = getElement(".tab-section");
  if (!friendZone) {
    return;
  }
  const userElement = friendZone.querySelector(`[data-id="${data.id}"]`);

  const chatStatusElement = userElement.querySelector(".chat-status");
  chatStatusElement.style.backgroundColor = "#6c757d";
};
