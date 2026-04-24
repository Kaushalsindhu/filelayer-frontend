import api from "./axios";

export const getDashboardData = async () => {
  const res = await api.get("/users/dashboard");
  return res.data;
}
