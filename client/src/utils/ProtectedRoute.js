import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export { PrivateRoute };

function PrivateRoute({ user, children }) {
  const LoggedIn = localStorage.getItem("accessToken");
  const userLoggedIn = LoggedIn ? jwt_decode(LoggedIn) : null;
  const exp = LoggedIn ? userLoggedIn.exp : null;
  const currentDate = Date.now() / 1000;

  if (!LoggedIn || exp < currentDate) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" />;
  } else if (user === "both") {
    return children;
  } else if (user !== userLoggedIn.role && userLoggedIn.role == "client") {
    return <Navigate to="/task-list" />;
  } else if (user !== userLoggedIn.role && userLoggedIn.role == "freelancer") {
    return <Navigate to="/task-list" />;
  }

  return children;
}
