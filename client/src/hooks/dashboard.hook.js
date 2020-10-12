import axios from "axios";
import axiosRetry from "axios-retry";

const storageName = "userStorage";

axiosRetry(axios, { retries: 3 });

// get passwords query
export const getPasswords = async (token, sortValue) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response = await axios.get(`/api/pass/?sort=${sortValue}`, config);
    return response.data;
  } catch (err) {}
};

// create password query
export const createPassword = (obj) =>
  new Promise((resolve, reject) => {
    axios
      .post("/api/pass/create", obj, getConfig())
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

// edit password query
export const editPassword = (obj) =>
  new Promise((resolve, reject) => {
    axios
      .put(`/api/pass/edit/${obj._id}`, obj, getConfig())
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

// delete password query
export const deletePassword = (id) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`/api/pass/delete/${id}`, getConfig())
      .then((res) => resolve(res.data.message))
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

// Setup config with token - helper func
const getConfig = () => {
  // Get token from state
  const token = JSON.parse(localStorage.getItem(storageName)).token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
