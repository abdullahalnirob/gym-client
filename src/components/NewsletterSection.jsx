import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const NewsletterSection = () => {
  const [subscriber, setSubscriber] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriber({ ...subscriber, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subscriber.name || !subscriber.email) {
      toast.error("Please fill out both fields");
      return;
    }

    try {
      await axios.post("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/newsletter", subscriber);
      toast.success("Subscribed successfully!");
      setSubscriber({ name: "", email: "" });
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed!");
    }
  };

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-8">
          Stay updated with our latest classes, trainers, and fitness tips. Sign up now!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={subscriber.name}
            onChange={handleChange}
            className="px-4 py-2 w-full sm:w-auto bg-[#FFF] rounded shadow ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 duration-200 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={subscriber.email}
            onChange={handleChange}
            className="px-4 py-2 w-full sm:w-auto bg-[#FFF] rounded shadow ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 duration-200 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
