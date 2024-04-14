import Mock from "mockjs";
import { failResponse, successResponse } from "@/mock/response-wrap";

Mock.mock("/account/user/upload", () => {
  return successResponse();
});
