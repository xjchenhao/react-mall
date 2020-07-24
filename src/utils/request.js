import axios from "axios";
import { Toast } from "antd-mobile";

// const URL = require("url");

const request = options => {
  // const urlObj = URL.parse(window.location.href, true);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/x-www-form-urlencoded"
  };

  options.method = options.type || "post";
  options.headers = { ...headers, ...options.headers };
  options.withCredentials = true;

  options.validateStatus = status => {
    return status < 500;
  };

  //拼接通用参数
  if (options.method === "post") {
    options.url = `${options.url}?clientType=h5`;
  } else {
    options.url = options.url.replace("?", "?clientType=h5&");
  }
  //console.log(options.url);

  return axios(options)
    .then(res => {
      const data = res.data;
      const code = Number(data.code);

      if (code === 403) {
        Toast.info('请先登录')
      }

      return data;
    })
    .catch(error => {
      return Promise.reject(error.response);
    });
};

export default request;
