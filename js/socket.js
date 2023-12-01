const socket = io("http://127.0.0.1:8080/");

socket.on("connect", () => socket.emit("user", USERID));

function sendMessage(message, from, to, date) {
  const data = { message, from, to, date };
  socket.emit("private message", data);
  instantMessage(data);
}

socket.on("private message", (data) => instantMessage(data));

socket.on("active", (data) => activeUser(data));

socket.on("disconnectedUser", (data) => disconnectedUser(data));
