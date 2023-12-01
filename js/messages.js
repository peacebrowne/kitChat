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

function instantMessage(message) {
  const messagesContainer = getElement(".messages");

  if (messagesContainer) {
    const messageTemplate =
      message.from !== USERID
        ? `<div class="msg received-msg"><div class="msg-bubble"><div class="msg-text">${message.msg}</div></div></div>`
        : `<div class="msg sent-msg"><div class="msg-bubble"><div class="msg-text">${message.msg}</div></div></div>`;
    messagesContainer.insertAdjacentHTML("beforeend", messageTemplate);
    scrollToLatestMessage();
  } else {
    const friendZone = getElement(".tab-section");
    const friend = FRIENDS.find((friend) => friend.id === message.from);
    const friendElement = Array.from(friendZone.children).find(
      (element) => element.dataset.id === friend.id
    );
    const latestMessageElement =
      friendElement.querySelector(".chat-latest-msg");
    latestMessageElement.innerText = message.msg;
    friendZone.insertBefore(friendElement, friendZone.firstChild);
  }
}

function scrollToLatestMessage() {
  window.scrollTo(0, document.body.scrollHeight);
}

const activeUser = (data) => {
  const friendZone = getElement(".tab-section");
  const friendsList = [];
  const activeUserList = [];
  const filteredData = data.filter((value) => value.user !== USERID);
  filteredData.forEach((value) => {
    FRIENDS.forEach((friend) => {
      if (friend.id === value.user) {
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
    }
  });
};

const disconnectedUser = (data) => {
  const friendZone = getElement(".tab-section");
  const userElement = friendZone.querySelector(`[data-id="${data.user}"]`);

  if (userElement) {
    const chatStatusElement = userElement.querySelector(".chat-status");
    chatStatusElement.style.backgroundColor = "#6c757d";
  }
};
