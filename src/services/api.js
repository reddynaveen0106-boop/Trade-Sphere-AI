import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getCountries = async () => {
  const response = await api.get("/countries");
  return response.data;
};

export default api;