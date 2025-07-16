import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
// Time slot options
const timeOptions = [
  {
    value: "6:00 AM - 7:00 AM",
    label: "6:00 AM - 7:00 AM",
    category: "morning",
  },
  {
    value: "8:00 AM - 9:00 AM",
    label: "8:00 AM - 9:00 AM",
    category: "morning",
  },
  {
    value: "4:00 PM - 5:00 PM",
    label: "4:00 PM - 5:00 PM",
    category: "evening",
  },
  {
    value: "5:00 PM - 6:00 PM",
    label: "5:00 PM - 6:00 PM",
    category: "evening",
  },
  {
    value: "6:00 PM - 7:00 PM",
    label: "6:00 PM - 7:00 PM",
    category: "evening",
  },
  { value: "7:00 PM - 8:00 PM", label: "7:00 PM - 8:00 PM", category: "night" },
  { value: "8:00 PM - 9:00 PM", label: "8:00 PM - 9:00 PM", category: "night" },
  {
    value: "9:00 PM - 10:00 PM",
    label: "9:00 PM - 10:00 PM",
    category: "night",
  },
];

// Grouped options for react-select
const groupedOptions = [
  {
    label: "Morning",
    options: timeOptions.filter((opt) => opt.category === "morning"),
  },
  {
    label: "Evening",
    options: timeOptions.filter((opt) => opt.category === "evening"),
  },
  {
    label: "Night",
    options: timeOptions.filter((opt) => opt.category === "night"),
  },
];

const AddSlot = () => {
  const [id, setId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/allusers")
      .then((res) => {
        const trainer = res.data.users.find(
          (u) => u.role === "trainer" && u.email === user.email
        );
        if (trainer) {
          setId(trainer._id);
        }
      })
      .catch((err) => {
        toast.error("Error fetching users!");
      });
  }, [user]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const selectedSlot = data.timeSlot.value;

    try {
      await axios.patch(`https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/allusers/${id}`, {
        timeSlot: selectedSlot,
      });
      toast.success("Slot added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding slot:", error);

      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";

      toast.error(message);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">Add Time Slot</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Controller
            name="timeSlot"
            control={control}
            rules={{ required: "Please select a time slot" }}
            render={({ field }) => (
              <Select
                {...field}
                options={groupedOptions}
                placeholder="Select a time slot"
                isDisabled={isSubmitting}
              />
            )}
          />
          {errors.timeSlot && (
            <p className="text-red-500 text-sm mt-1">
              {errors.timeSlot.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !id}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
