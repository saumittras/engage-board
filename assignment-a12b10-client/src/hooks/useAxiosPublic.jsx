import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assignment-a12b10-server-n.vercel.app",
  // baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
