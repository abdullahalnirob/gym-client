import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal, Box, Typography, Avatar, Chip, Divider } from "@mui/material";
import toast from "react-hot-toast";

const fetchPendingTrainers = async () => {
  const response = await axios.get("http://localhost:3000/api/pendingtrainer");
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

const AppliedTrainers = () => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["pendingTrainers"],
    queryFn: fetchPendingTrainers,
  });

  const [open, setOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleOpen = (trainer) => {
    setSelectedTrainer(trainer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTrainer(null);
  };

  const approveTrainer = (trainer) => {
    const setData = {
      trainerName: trainer.name,
      trainerEmail: trainer.email,
      role: "trainer",
      trainerSkills: trainer.skills,
      trainerAvailableDays: trainer.availableDays.map((day) =>
        day.value ? day.value : day
      ),
      availableSlots: trainer.availableSlots.map((slot) =>
        slot.value ? slot.value : slot
      ),
      socials: trainer.socials,
      experence: trainer.experience,
    };
    axios
      .patch("http://localhost:3000/api/users", setData)
      .then(() => {
        return axios.delete(
          `http://localhost:3000/api/pendingtrainer/${trainer._id}`
        );
      })
      .then(() => {
        axios.patch("http://localhost:3000/api/activty", {
          email: trainer.email,
          status: "approved",
          role: "trainer",
        });
        toast.success("Trainer approved successfully!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.message || "Approval failed");
      });
  };

  const rejectTrainer = (trainerId) => {
    axios
      .delete(`http://localhost:3000/api/pendingtrainer/${trainerId}`)
      .then(() => {
        toast.success("Trainer rejected successfully!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.message || "Rejection failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6">
          Applied Trainers
        </h1>

        <div className="bg-white ring-1 ring-blue-200 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full w-max sm:w-full divide-y divide-gray-200">
              <thead className="bg-blue-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Application Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
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
                      No pending trainers found.
                    </td>
                  </tr>
                ) : (
                  data.map((trainer, index) => (
                    <tr
                      key={trainer._id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {trainer.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {trainer.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date().toISOString().split("T")[0]}
                      </td>
                      <td className="px-4 py-3 text-sm flex items-center gap-2">
                        <button
                          onClick={() => handleOpen(trainer)}
                          className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => approveTrainer(trainer)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectTrainer(trainer._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                        >
                          Reject
                        </button>
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
            {selectedTrainer && (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={2}
                >
                  <Avatar
                    src={selectedTrainer.profileImage}
                    alt={selectedTrainer.name}
                    sx={{ width: 80, height: 80, mb: 1 }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {selectedTrainer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTrainer.email}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" gutterBottom>
                  <strong>Age:</strong> {selectedTrainer.age}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Other Info:</strong> {selectedTrainer.otherInfo}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Skills:</strong>{" "}
                  {selectedTrainer.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mt: 0.5 }}
                    />
                  ))}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Available Days:</strong>{" "}
                  {selectedTrainer.availableDays.map((day, idx) => (
                    <Chip
                      key={idx}
                      label={day.label || day}
                      size="small"
                      sx={{ mr: 1, mt: 0.5 }}
                    />
                  ))}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Available Time:</strong>{" "}
                  {selectedTrainer.availableSlots.map((slot, idx) => (
                    <Chip
                      key={idx}
                      label={slot.label || slot}
                      size="small"
                      sx={{ mr: 1, mt: 0.5 }}
                    />
                  ))}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AppliedTrainers;
