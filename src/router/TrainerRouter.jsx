import useRole from "../hook/useRole";
import { Navigate } from "react-router-dom";

const TrainerRouter = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) return <p>Loading...</p>;

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TrainerRouter;
