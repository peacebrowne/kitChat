const URL = `http://127.0.0.1:5000/`;

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
