import store from "./localstorage";
const axios = require("axios").default;
const apiUrl = process.env.REACT_APP_API_URL;

const GET = "GET";
const POST = "POST";

export const createNewPollToAPI = async (body) => {
  try {
    return await request(apiUrl + "PollGame", POST, body);
  } catch (error) {
    throw error;
  }
};

export const authenticateAccessToken = async () => {
  try {
    return await request(apiUrl + "TempUser/Authenticate", POST);
  } catch (error) {
    throw error;
  }
};

export const getQuestionFromAPI = async () => {
  try {
    return await request(apiUrl + "Question", GET);
  } catch (error) {
    throw error;
  }
};

const request = async (url, requestType, body) => {
  let config = {
    headers: {
      Authorization: store.getAccessToken(),
    },
  };

  try {
    let response;
    if (requestType === POST) response = await axios.post(url, body, config);
    if (requestType === GET) response = await axios.get(url, config);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Something went wrong");
  } catch (error) {
    if (!error.status) {
      throw new Error(error.response.data);
    }
    throw new Error(error.response.data);
  }
};
