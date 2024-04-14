import axios from "axios";

export function accountUpload(data:FormData, config: {
  onUploadProgress?: (progressEvent: any) => void;
}) {
  return axios.post("/account/user/upload", data, config);
}
