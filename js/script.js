// const URL = `https://kitchat-api.glitch.me/`;
const URL = "http://127.0.0.1:8080/";

// SIGN UP
async function postUser(data, endpoint) {
  return await fetch(`${URL}${endpoint}`, {
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
