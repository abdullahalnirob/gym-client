import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hook/useAuth";
import { IoIosTime } from "react-icons/io";

const ManageSlot = () => {
    const [renderSlot, setRenderSlot] = useState([]);
    const { user } = useAuth();

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

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Manage Slot</h1>

            {isLoading && <p className="text-center mx-auto">Loading...</p>}
            {isError && <p className="text-center mx-auto">Error: {error.message}</p>}
            <div className="mt-4">
                <h2 className="font-semibold">Your Available Slots:</h2>
                <div className="px-5 my-3 py-4 bg-white shadow-md ring-1 ring-gray-300 rounded-lg">
                    {renderSlot.length > 0 ? (
                        renderSlot.map((slot, index) => <div className="rounded-lg shadow ring-1 ring-gray-300 my-4 px-4 py-3 flex items-center justify-between"><p className="flex gap-1 items-center" key={index}><IoIosTime className="text-blue-500" size={22}/> {slot}</p>
                        <button className="text-sm bg-red-500 hover:bg-red-600 duration-200 text-white cursor-pointer px-3  py-2 rounded-md">Delete slot</button>
                        </div>)
                    ) : (
                        <p>No slots found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSlot;
