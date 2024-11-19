import { jwtDecode } from "jwt-decode";

export const checkAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);

  console.log(decoded.user.role === "admin");
  return decoded.user.role === "admin";
};
