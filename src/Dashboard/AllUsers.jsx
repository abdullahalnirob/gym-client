import axios from "axios";
import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Box, Typography, Avatar, Divider } from "@mui/material";
import toast from "react-hot-toast";

// Fetch all users
const fetchAllUsers = async () => {
  const response = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/allusers");
  return response.data.users;
};

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  // Query to get all users
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
  });

  // Open modal
  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleMakeAdmin = (id) => {
    axios.patch(`https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/user-to-admin/${id}`).then((res) => {
      toast.success("User made admin");
      console.log(res.data);
      queryClient.invalidateQueries("allUsers");
    }).catch(() => {
      toast.error("Something went wrong")
    })

  };
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">All Users</h1>

        <div className="bg-white ring-1 ring-blue-200 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full w-max sm:w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="5" className="text-center text-red-500 py-6">
                      Error: {error.message}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  data.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 capitalize">
                        {user.role || "user"}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleOpen(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs"
                        >
                          View
                        </button>
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className={`px-3 py-1.5 rounded text-xs text-white bg-green-500 hover:bg-green-600
                            `}
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Detail Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            {selectedUser && (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={2}
                >
                  <Avatar
                    src={selectedUser.photo || "/avatar.png"}
                    alt={selectedUser.name}
                    sx={{ width: 80, height: 80, mb: 1 }}
                    onError={(e) => (e.target.src = "/avatar.png")}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {selectedUser.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.email}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" gutterBottom>
                  <strong>Role:</strong> {selectedUser.role || "user"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Experience:</strong>{" "}
                  {selectedUser.experience || "N/A"}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AllUsers;
