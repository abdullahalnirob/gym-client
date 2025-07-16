import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hook/useAuth";
import { IoIosTime } from "react-icons/io";
import toast from "react-hot-toast";

const ManageSlot = () => {
    const [renderSlot, setRenderSlot] = useState([]);
    const { user } = useAuth();

    // Fetch all users
    const fetchSlots = async () => {
        const res = await axios.get("http://localhost:3000/api/allusers");
        return res.data;
    };

    const {
        data: slots,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["slots"],
        queryFn: fetchSlots,
    });

    // Extract trainer's slots
    useEffect(() => {
        if (slots?.users && user?.email) {
            const currentTrainer = slots.users.find(
                (u) => u.email === user.email && u.role === "trainer"
            );

            if (currentTrainer) {
                console.log("Trainer found:", currentTrainer.email);
                setRenderSlot(currentTrainer.availableSlots || []);
            } else {
                console.log("Trainer not found");
                setRenderSlot([]);
            }
        }
    }, [slots, user]);

    // DELETE handler
    const handleDelete = async (slotToDelete) => {
        const trainer = slots?.users?.find(
            (u) => u.email === user.email && u.role === "trainer"
        );

        if (!trainer) return toast.error("Trainer not found");

        try {
            await axios.delete(`http://localhost:3000/api/allusers/${trainer._id}/slot`, {
                data: { timeSlot: slotToDelete }, // DELETE with body in axios
            });

            // Update UI
            setRenderSlot((prev) => prev.filter((slot) => slot !== slotToDelete));
            toast.success("Slot deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete slot");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Manage Slots</h1>

            {isLoading && <p className="text-center mx-auto">Loading...</p>}
            {isError && <p className="text-center mx-auto">Error: {error.message}</p>}

            <div className="mt-4">
                <h2 className="font-semibold text-lg mb-2">Your Available Slots:</h2>

                <div className="bg-white shadow-md ring-1 ring-gray-300 rounded-lg px-5 py-4">
                    {renderSlot.length > 0 ? (
                        renderSlot.map((slot, index) => (
                            <div
                                key={index}
                                className="rounded-lg shadow ring-1 ring-gray-300 my-4 px-4 py-3 flex items-center justify-between"
                            >
                                <p className="flex gap-2 items-center text-gray-700 font-medium">
                                    <IoIosTime className="text-blue-500" size={22} />
                                    {slot}
                                </p>
                                <button
                                    onClick={() => handleDelete(slot)}
                                    className="text-sm bg-red-500 hover:bg-red-600 duration-200 text-white cursor-pointer px-3 py-2 rounded-md"
                                >
                                    Delete slot
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No slots found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSlot;
