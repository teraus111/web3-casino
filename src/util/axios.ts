import axios from "axios";
import { API_URL } from "@/config";

const axiosServices = axios.create({
  baseURL: `${API_URL}/api`,
});
export default axiosServices;
