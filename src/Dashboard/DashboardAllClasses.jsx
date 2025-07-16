import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Box, Typography, Avatar, Divider } from "@mui/material";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Fetch all classes
const fetchClasses = async () => {
  const res = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/classes");
  return res.data;
};

// Delete class by ID
const deleteClass = async (id) => {
  return await axios.delete(`https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/classes/${id}`);
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

const DashboardAllClasses = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Fetch classes
  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      toast.success("Class deleted successfully");
      queryClient.invalidateQueries(["classes"]);
      setOpen(false); // close modal if open
    },
    onError: () => {
      toast.error("Failed to delete class");
    },
  });

  // Open modal with class info
  const handleOpen = (cls) => {
    setSelectedClass(cls);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedClass(null);
  };

  // Delete handler with SweetAlert confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">All Classes</h1>

        <div className="bg-white ring-1 ring-blue-200 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full w-max sm:w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Class Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Instructor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6">Loading...</td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="4" className="text-center text-red-500 py-6">Error: {error.message}</td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6">No classes found.</td>
                  </tr>
                ) : (
                  data.map((cls, index) => (
                    <tr key={cls._id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{cls.className}</td>
                      <td className="px-4 py-3">{cls.instructor || "N/A"}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleOpen(cls)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(cls._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Class Detail Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            {selectedClass && (
              <>
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <Avatar
                    src={selectedClass.image || "/default-class.jpg"}
                    alt={selectedClass.className}
                    sx={{ width: 80, height: 80, mb: 1 }}
                    onError={(e) => (e.target.src = "/default-class.jpg")}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {selectedClass.className}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Instructor: {selectedClass.instructor || "Unknown"}
                  </Typography>

                  <Divider sx={{ width: "100%", mb: 2 }} />

                  <Typography variant="body1" gutterBottom>
                    <strong>Details:</strong> {selectedClass.details || "No description available."}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Additional Info:</strong> {selectedClass.additionalInfo || "N/A"}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardAllClasses;
