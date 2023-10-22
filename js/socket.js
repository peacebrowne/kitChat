const socket = io("http://127.0.0.1:8080/");

socket.on("connect", () => {
  console.log(socket.id);
});

function sentMessage(msg, from, to) {
  const data = { msg, from, to };
  socket.emit("chat message", JSON.stringify(data));
}
