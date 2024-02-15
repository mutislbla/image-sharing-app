import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginRoute = ({ children }) => {
  const isUserLoggedIn = Cookies.get("token") !== undefined;

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};
