import axios from "axios";
import { PageParam, PageResult } from "@/api/index.ts";
import { getAssetsImage } from "@/utils/util.ts";

export interface ArticleParma extends PageParam {
  categoryCheckList?: string[];
  owner?: string[];
  sort?: "latestPublish" | "mostRead" | "mostCollect";
}

export interface ProjectParma extends PageParam {
  categoryCheckList?: string[];
  sort?: "latestCreate" | "lastUpdate";
}

export interface ApplicationParma extends PageParam {
  categoryCheckList?: string[];
  sort?: "latestCreate" | "lastUpdate";
}

export interface ArticleData {
  title: string;
  content: string;
  logo: string;
  owner: string;
  href: string;
  createDate: string;
  star: number;
  like: number;
  message: number;
  id?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  cover: string;
  updateDate: string;
  members: { name: string; src: string }[];
  id?: string;
}

export interface ApplicationData {
  title: string;
  newUser: number;
  activeUser: number;
  logo: string;
  id?: string;
}

export function getArticleList(data: ArticleParma) {
  return axios.post<PageResult<ArticleData>>("/api/search/articleList", data);
}

export function getProjectList(data: ProjectParma) {
  return axios.post<PageResult<ProjectData>>("/api/search/projectList", data);
}

export function getApplicationList(data: ApplicationParma) {
  return axios.post<PageResult<ApplicationData>>(
    "/api/search/applicationList",
    data,
  );
}
