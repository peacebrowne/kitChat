const socket = io("http://127.0.0.1:8080/");
let activeAccount;

socket.on("connect", () => socket.emit("user", USERID));

function sendMessage(message, from, to, datetime) {
  const data = { message, from, to };
  data["datetime"] = datetime;
  socket.emit("private message", data);
  instantMessage(data);
}

socket.on("private message", (data) => instantMessage(data));

socket.on("active", (data) => {
  activeAccount = data;
  activeUser(activeAccount);
});

socket.on("disconnectedUser", (data) => disconnectedUser(data));
