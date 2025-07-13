import axios from "axios";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Modal,
    Box,
    Typography,
    Avatar,
    Chip,
    Divider,
    Button,
} from "@mui/material";
import toast from "react-hot-toast";

const fetchAllUsers = async () => {
    const response = await axios.get("http://localhost:3000/api/allusers");
    return response.data.users;
};

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

    const { data = [], isLoading, isError, error } = useQuery({
        queryKey: ["allUsers"],
        queryFn: fetchAllUsers,
    });

    const mutation = useMutation({
        mutationFn: async (userId) => {
            return await axios.patch(`http://localhost:3000/api/users/${userId}`, {
                role: "admin",
            });
        },
        onSuccess: () => {
            toast.success("User promoted to admin!");
            queryClient.invalidateQueries(["allUsers"]);
        },
        onError: () => {
            toast.error("Failed to make admin");
        },
    });

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
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
                                            <td className="px-4 py-3 capitalize">{user.role || "user"}</td>
                                            <td className="px-4 py-3 flex gap-2">
                                                <button
                                                    onClick={() => handleOpen(user)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs"
                                                >
                                                    View
                                                </button>
                                                {user.role !== "admin" && (
                                                    <button
                                                        onClick={() => mutation.mutate(user._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs"
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

                <Modal open={open} onClose={handleClose}>
                    <Box sx={modalStyle}>
                        {selectedUser && (
                            <>
                                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                                    <Avatar
                                        src={selectedUser.photo}
                                        alt={selectedUser.name}
                                        sx={{ width: 80, height: 80, mb: 1 }}
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
                                    <strong>Experience:</strong> {selectedUser.experience || "N/A"}
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
