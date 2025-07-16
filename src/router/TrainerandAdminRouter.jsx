import useRole from "../hook/useRole";
import { Navigate } from "react-router-dom";

const TrainerandAdminRouter = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) return <p>Loading...</p>;

  // Allow access if role is admin OR trainer
  if (role !== "admin" && role !== "trainer") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TrainerandAdminRouter;
