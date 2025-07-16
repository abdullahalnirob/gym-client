import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/allusers"
      );
      return res.data?.users || [];
    },
  });

  useEffect(() => {
    if (user?.email && users.length > 0) {
      const currentUser = users.find((u) => u.email === user.email);
      setRole(currentUser?.role || "user");
      setLoading(false);
    }
  }, [user, users]);

  return { role, loading };
};

export default useRole;
