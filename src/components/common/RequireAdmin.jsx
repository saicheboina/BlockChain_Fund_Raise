import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

const RequireAdmin = ({ children }) => {
  let { isAuthenticated } = React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please Login To Continue");
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};
export default RequireAdmin;
