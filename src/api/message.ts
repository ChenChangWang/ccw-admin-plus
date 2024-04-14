import axios from "axios";
import type { PageResult } from "@/api/index.ts";

export interface MessageData {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  avatar: string;
  date: string;
  isRead: boolean;
}

export interface NoticeData {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

export interface TodoData {
  id: string;
  title: string;
  status: "success" | "info" | "danger";
  statusLabel: string;
  endDesc: string;
  isRead: boolean;
}

export function getMessageList() {
  return axios.post<PageResult<MessageData>>("/api/message/queryMessage");
}
export function getNoticeList() {
  return axios.post<PageResult<NoticeData>>("/api/message/queryNotice");
}
export function getTodoList() {
  return axios.post<PageResult<TodoData>>("/api/message/queryTodo");
}

export function messageRead(data: { id: string }) {
  return axios.post("/api/message/messageRead", data);
}
export function noticeRead(data: { id: string }) {
  return axios.post("/api/message/noticeRead", data);
}
export function todoRead(data: { id: string }) {
  return axios.post("/api/message/todoRead", data);
}

export function messageAllRead() {
  return axios.post("/api/message/messageAllRead");
}
export function noticeAllRead() {
  return axios.post("/api/message/noticeAllRead");
}
export function todoAllRead() {
  return axios.post("/api/message/todoAllRead");
}

export function messageClear() {
  return axios.post("/api/message/messageClear");
}
export function noticeClear() {
  return axios.post("/api/message/noticeClear");
}
export function todoClear() {
  return axios.post("/api/message/todoClear");
}
