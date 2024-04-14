import Mock from "mockjs";
import { successResponse } from "@/mock/response-wrap";

Mock.mock("/api/form/stepSubmit", (params) => {
  const { body } = params;
  return successResponse();
});

Mock.mock("/api/form/userSubmit", (params) => {
  const { body } = params;
  return successResponse();
});
