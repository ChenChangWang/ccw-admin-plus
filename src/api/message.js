import axios from "axios";
import qs from "query-string";

export function getMessageList(data) {
  return axios.post("/api/message/queryMessage", data);
}
export function getNoticeList(data) {
  return axios.post("/api/message/queryNotice", data);
}
export function getTodoList(data) {
  return axios.post("/api/message/queryTodo", data);
}

export function messageRead(data) {
  return axios.post("/api/message/messageRead", data);
}
export function noticeRead(data) {
  return axios.post("/api/message/noticeRead", data);
}
export function todoRead(data) {
  return axios.post("/api/message/todoRead", data);
}

export function messageAllRead(data) {
  return axios.post("/api/message/messageAllRead", data);
}
export function noticeAllRead(data) {
  return axios.post("/api/message/noticeAllRead", data);
}
export function todoAllRead(data) {
  return axios.post("/api/message/todoAllRead", data);
}

export function messageClear(data) {
  return axios.post("/api/message/messageClear", data);
}
export function noticeClear(data) {
  return axios.post("/api/message/noticeClear", data);
}
export function todoClear(data) {
  return axios.post("/api/message/todoClear", data);
}
