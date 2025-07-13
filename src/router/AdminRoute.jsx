import useRole from "../hook/useRole";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) return <p>Loading...</p>;

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
