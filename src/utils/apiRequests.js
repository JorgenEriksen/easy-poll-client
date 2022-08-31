import { getAccessToken } from "./localstorage";
const axios = require("axios").default;

const apiUrl = process.env.REACT_APP_API_URL;

export const createNewPollToAPI = async (body) => {
  try {
    return await postRequest(apiUrl + "PollGame", body);
  } catch (error) {
    throw error;
  }
};

export const authenticateAccessToken = async () => {
  try {
    return await postRequest(apiUrl + "TempUser/Authenticate");
  } catch (error) {
    throw error;
  }
};

const postRequest = async (url, body) => {
  let config = {
    headers: {
      Authorization: getAccessToken(),
    },
  };

  try {
    const response = await axios.post(url, body, config);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Something went wrong");
  } catch (error) {
    if (!error.status) {
      throw new Error("Network problem");
    }
    throw new Error(error.response.data);
  }
};
