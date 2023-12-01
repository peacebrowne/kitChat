/**
 * Displaying previous messages between user and friend.
 * @param { String } friend - Active friend
 * @param { Array }  messages - Array of messages
 * @returns {void}
 */
function previousMessages(messages) {
  const messagesContainer = getElement(".messages");
  const messageTemplate = (message) =>
    message.from !== USERID
      ? `<div class="msg received-msg"><div class="msg-bubble"><div class="msg-text">${message.message}</div></div></div>`
      : `<div class="msg sent-msg"><div class="msg-bubble"><div class="msg-text">${message.message}</div></div></div>`;

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

function instantMessage(currentMessage) {
  const messagesContainer = getElement(".messages");
  if (messagesContainer) {
    const messageTemplate =
      currentMessage.from !== USERID
        ? `<div class="msg received-msg"><div class="msg-bubble"><div class="msg-text">${currentMessage.message}</div></div></div>`
        : `<div class="msg sent-msg"><div class="msg-bubble"><div class="msg-text">${currentMessage.message}</div></div></div>`;
    messagesContainer.insertAdjacentHTML("beforeend", messageTemplate);
    scrollToLatestMessage();
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

function scrollToLatestMessage() {
  window.scrollTo(0, document.body.scrollHeight);
}

const activeUser = (data) => {
  setTimeout(() => {
    const friendZone = getElement(".current-section");
    const friendsList = [];
    const activeUserList = [];
    const filteredData = data.filter((user) => user.id !== USERID);
    filteredData.forEach((user) => {
      FRIENDS.forEach((friend) => {
        if (friend.id === user.id) {
          friendsList.push(friend.id);
        }
      });
    });

    friendsList.forEach((userId) => {
      const userElement = friendZone.querySelector(`[data-id="${userId}"]`);
      if (userElement) {
        const chatStatusElement = userElement.querySelector(".chat-status");
        if (chatStatusElement) {
          chatStatusElement.style.backgroundColor = "#82d616";
          activeUserList.push(chatStatusElement);
        }
      } else {
        const chatStatusElement =
          getElement("header").querySelector(".chat-status");
        if (chatStatusElement) {
          chatStatusElement.style.backgroundColor = "#82d616";
          activeUserList.push(chatStatusElement);
        }
      }
    });
  }, 100);
};

const disconnectedUser = (data) => {
  const friendZone = getElement(".tab-section");
  const userElement = friendZone.querySelector(`[data-id="${data.user}"]`);

  if (userElement) {
    const chatStatusElement = userElement.querySelector(".chat-status");
    chatStatusElement.style.backgroundColor = "#6c757d";
  }
};
