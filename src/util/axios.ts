import axios from "axios";

const axiosServices = axios.create({
  baseURL: `http://localhost:5000/api`,
});
export default axiosServices;
