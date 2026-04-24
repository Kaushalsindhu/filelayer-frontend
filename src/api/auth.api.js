import api from "./axios";

export const loginUser = async (data) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await api.post("/users/signup", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/users/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/profile");
  return res.data.user;
}