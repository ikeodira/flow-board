import React from "react";
import useStore from "../../store";
import { Navigate } from "react-router-dom";

function PublicOnlyRoute({ Component }) {
  const { isLoggedIn } = useStore();
  return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
}

export default PublicOnlyRoute;
