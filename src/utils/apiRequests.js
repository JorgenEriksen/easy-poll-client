import store from "./localstorage";
const axios = require("axios").default;
const apiUrl = process.env.REACT_APP_API_URL;

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

export const submitQuestionAnswer = async (body) => {
  try {
    return await request(apiUrl + "Question", POST, body);
  } catch (error) {
    throw error;
  }
};

export const startPollGameAPI = async () => {
  try {
    return await request(apiUrl + "PollGame/Start", PUT);
  } catch (error) {
    throw error;
  }
};

export const authenticateInviteCodeAPI = async (inviteCode) => {
  try {
    return await request(apiUrl + "PollGame/Authenticate", POST, null, {
      inviteCode,
    });
  } catch (error) {
    throw error;
  }
};

export const joinPollGameAPI = async (body) => {
  try {
    return await request(apiUrl + "TempUser", POST, body);
  } catch (error) {
    throw error;
  }
};

export const createNewPollAPI = async (body) => {
  try {
    return await request(apiUrl + "PollGame", POST, body);
  } catch (error) {
    throw error;
  }
};

export const authenticateAccessTokenAPI = async () => {
  try {
    return await request(apiUrl + "TempUser/Authenticate", POST);
  } catch (error) {
    throw error;
  }
};

export const getPollGameDataAPI = async () => {
  try {
    return await request(apiUrl + "TempUser/PollGameData", GET);
  } catch (error) {
    throw error;
  }
};

export const deletePollGameAPI = async () => {
  try {
    return await request(apiUrl + "PollGame", DELETE);
  } catch (error) {
    throw error;
  }
};

const request = async (url, requestType, body, params) => {
  let config = {
    headers: {
      Authorization: store.getAccessToken(),
    },
    params: params,
  };

  try {
    let response;
    if (requestType === POST) response = await axios.post(url, body, config);
    if (requestType === GET) response = await axios.get(url, config);
    if (requestType === PUT) response = await axios.put(url, body, config);
    if (requestType === DELETE) response = await axios.delete(url, config);
    if (response.status && response.status === 200) return response.data;

    throw new Error("Something went wrong");
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    console.log(error);
    throw new Error(error.message);
  }
};
