// const URL = `https://kitchat-api.glitch.me/`;
const URL = "http://127.0.0.1:5000/";

// SIGN UP
async function postUser(data) {
  return await fetch(`${URL}user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// get request
const getUser = async () => {
  const response = await fetch(`${URL}user`);
  const data = await response.json();
  return data;
};

// H;*t9UPn&4D-xB!

// Aa1!
