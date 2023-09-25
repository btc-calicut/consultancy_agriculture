"use client";

import { useState } from "react";
import { notification } from "antd";
import Image from "next/image";
import messages from "@public/images/messages.png";

const Enquiry = () => {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [api, contextHolder] = notification.useNotification({
    placement: "top",
  });
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      description: "Our team will contact with you at the earliest",
      duration: 2.5,
      closeIcon: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const response = await fetch(`api/enquiry`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      openNotificationWithIcon("success", data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div id="enquiry" className="bg-zinc-200 w-full">
      {contextHolder}
      <div className="flex flex-col sm:flex-row sm:gap-x-4 px-6 sm:px-10 md:px-14 lg:px-36 py-10 xs:py-20">
        <div className="sm:w-1/2">
          <div>
            <h1 className="sm:text-left text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins py-4 sm:leading-[1.2]">
              Share Your Queries With Us
            </h1>
            <Image
              alt="messages"
              src={messages}
              width={60}
              height={60}
              className="hidden sm:block"
            />
          </div>

          <p className="hidden sm:block text-xs sm:text-sm md:text-lg text-left text-gray-500">
            Whether you have inquiries about our products and services, need
            assistance, or simply want to share your thoughts and ideas, we're
            here to listen and respond. Your input is essential in helping us
            improve and better serve your needs. Your questions and comments are
            invaluable to us, and we look forward to hearing from you.
          </p>
        </div>

        <div className="my-2 max-xs:mt-5 sm:w-1/2 p-6 lg:p-12 shadow-2xl bg-white rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black "
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className="col-span-2 w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black"
                placeholder="Email address"
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="col-span-2 w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black"
                placeholder="Phone Number"
                type="tel"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            <textarea
              className="w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black"
              placeholder="Message"
              rows="8"
              name="message"
              id="message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-[#080621] px-5 py-3 font-medium text-white sm:w-auto"
                disabled={disabled}
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
