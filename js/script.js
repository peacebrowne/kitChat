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

// get request
const getSingleUser = async (id) => {
  const response = await fetch(`${URL}user?id=${id}`);
  const data = await response.json();
  return data;
};

const getMessage = async (from, to) => {
  const response = await fetch(`${URL}messages?from=${from}&to=${to}`);
  const data = await response.json();
  return data;
};

// getSingleUser("d13f0f1c-e80a-47b1-b689-a92e8780e0b1")
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

// H;*t9UPn&4D-xB!

// Aa1!
