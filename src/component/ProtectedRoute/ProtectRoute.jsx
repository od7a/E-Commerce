import { useContext } from "react";
import { UserContext } from "../../context/User.context";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const { token } = useContext(UserContext);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
