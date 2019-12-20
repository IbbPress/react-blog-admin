import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: "/",
  timeout: 2000 // 请求超时时间
});


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