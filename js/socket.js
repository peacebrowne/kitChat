const socket = io("http://127.0.0.1:8080/");

socket.on("connect", () => {
  socket.emit("user", userEmail);
});

function sentMessage(msg, from, to, date) {
  const data = { msg, from, to, date };
  socket.emit("chat message", data);
  instantMessage(data);
}

socket.on("chat message", (data) => {
  instantMessage(data);
  window.scrollTo(0, document.body.scrollHeight);
});
