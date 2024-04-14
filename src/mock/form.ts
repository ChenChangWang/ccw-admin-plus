import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";

Mock.mock("/api/form/stepSubmit", () => {
  return successResponse();
});

Mock.mock("/api/form/userSubmit", () => {
  return successResponse();
});
