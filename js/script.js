const URL = `https://kitchat-api.glitch.me/`;

// SIGN UP
const post_user = async (data) => {
  return await fetch(`${URL}user`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get request
const get_user = async () => {
  const response = await fetch(`${URL}user`);
  const data = await response.json();
  return data;
};
