import axios from "axios";

import { message } from 'antd';
// import { HashRouter } from "react-router-dom";
// import { BrowserHistory } from 'react-router'

// 创建 axios 实例
const request = axios.create({
  baseURL: "/ibb/admin/v1",
  timeout: 2000 // 请求超时时间
});

// 服务端响应失败处理函数
const errHandle = error => {
  const { status } = error.response
  if (status === 401) {
    message.info('请登录');
    // BrowserHistory.push('/login')
  }
  return Promise.reject(error);
};

// request 拦截器
request.interceptors.request.use(config => {
  // console.log('config: ', config);
  return config;
}, errHandle);

// response 拦截器
request.interceptors.response.use(response => {
  // console.log('response.data: ', response.data);
  return response.data;
}, errHandle);

export function GET (url, payload) {
  return request.get(url, {
    params: payload
  });
}

export function POST (url, payload) {
  return request.post(url, payload);
}

export function PUT (url, payload) {
  return request.put(url, payload);
}

export function DELETE (url, payload) {
  return request.delete(url, {
    data: payload
  });
}