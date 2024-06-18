import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function PublicRoute({ children }) {
  const loggedIn = localStorage.getItem("accessToken");
  const userRole = loggedIn ? jwt_decode(loggedIn).role : null;

  if (loggedIn) {
    if (userRole === "client" || userRole === "freelancer") {
      return <Navigate to="/task-list" />;
    } else if (userRole === "1") {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
}

export { PublicRoute };
