/**
 * Displays the conversation history between the current user and the specified friend.
 *
 * @param {Array} messages - An array of message objects representing the conversation history.
 */
function previousMessages(messages) {
  const messagesContainer = getElement(".messages");
  const messageTemplate = (currentMessage) =>
    `<div class="msg ${
      currentMessage.from === USERID ? "sent-msg" : "received-msg"
    } ">
            <div class="msg-bubble">
              <div class="msg-text">
                ${currentMessage.message}
              </div>
              <span class="msg-time"> 
                ${currentMessage.datetime.time.hour}: ${
      currentMessage.datetime.time.minute
    } 
              </span>
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
  const datetime = {
    date: {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    },
    time: {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    },
  };

  sendMessage(messageContent, USERID, FRDID, datetime);
  resetForm([messageInput]);
}

/**
 * Display instant messages between user and specified friend.
 *
 * @param { Object } currentMessage - A message object representing the currnet message.
 */
function instantMessage(currentMessage) {
  const messagesContainer = document.querySelector(".messages");

  if (!messagesContainer) {
    const friendZone = document.querySelector(".tab-section");
    if (!friendZone) return;

    const friend = FRIENDS.find((friend) => friend.id === currentMessage.from);
    const friendElement = Array.from(friendZone.children).find(
      (element) => element.dataset.id === friend.id
    );
    const latestMessageElement =
      friendElement.querySelector(".chat-latest-msg");
    latestMessageElement.innerText = currentMessage.message;
    friendZone.insertBefore(friendElement, friendZone.firstChild);
    return;
  }

  let messageTemplate;
  const time = `${currentMessage.datetime.time.hour}:${currentMessage.datetime.time.minute}`;

  if (currentMessage.from === USERID) {
    messageTemplate = `<div class="msg sent-msg">
      <div class="msg-bubble">
        <div class="msg-text">${currentMessage.message}</div>
        <span class="msg-time">${time}</span>
      </div>
    </div>`;
    messagesContainer.insertAdjacentHTML("beforeend", messageTemplate);
  } else if (currentMessage.from === FRDID) {
    messageTemplate = `<div class="msg received-msg">
      <div class="msg-bubble">
        <div class="msg-text">${currentMessage.message}</div>
        <span class="msg-time">${time}</span>
      </div>
    </div>`;
    messagesContainer.insertAdjacentHTML("beforeend", messageTemplate);
  }
}

/**
 * Validate and display all active users on each.
 *
 * @param {Array} data - Array of objects with active users.
 */
const activeUser = (data) => {
  if (!data) return;

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
