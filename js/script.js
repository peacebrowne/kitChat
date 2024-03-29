// const URL = `https://kitchat-api.glitch.me/`;
const URL = "http://127.0.0.1:8080/";

const postUser = async (data, route) => {
  try {
    const response = await fetch(`${URL}${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to get post user data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error posting user data ${error}`);
  }
};

// get all users
const getUser = async () => {
  try {
    const response = await fetch(`${URL}user`);
    if (!response.ok) {
      throw new Error(`Failed to get user data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return;
  }
};

// get latest messages
const latestUserMessages = async (id) => {
  try {
    const response = await fetch(`${URL}user?id=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to get user data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user latest message:", error);
    return;
  }
};

const getMessage = async (from, to) => {
  try {
    const response = await fetch(`${URL}messages?from=${from}&to=${to}`);
    if (!response.ok) {
      throw new Error(`Failed to get user messages: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user messages:", error);
    return;
  }
};
