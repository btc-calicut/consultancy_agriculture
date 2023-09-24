"use client";

import { useState } from "react";
import data from "@public/assets/data.json";
import Image from "next/image";
import { Carousel, notification } from "antd";

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
    <div id="enquiry" className="bg-zinc-100 w-full">
      {contextHolder}
      <div className="px-4 sm:px-10 md:px-14 lg:px-32">
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-x-4 lg:gap-x-16 gap-y-5">
            <div className="mx-3 grid grid-cols-1 items-center justify-center text-center sm:col-span-2 sm:my-3">
              <h1 className="text-indigo-900 font-sans m-1 max-sm:mb-4 text-[35px] tracking-wide leading-relaxed font-bold">
                Get in Touch!
              </h1>
              <div className="p-4 sm:p-6 mx-6 xs:mx-16 sm:mx-20 md:mx-2 border rounded-lg bg-zinc-50 shadow-lg">
                <Carousel dots={false} autoplay>
                  {data.employees.map((employee, index) => {
                    return (
                      <div key={index}>
                        <div className="md:h-80 max-sm:mx-1 flex md:flex-col text-center items-center justify-center">
                          <div className="max-md:w-1/3">
                            <div className="w-16 sm:w-20 h-16 sm:h-20 overflow-hidden">
                              <Image
                                alt={employee.name}
                                src={employee.image}
                                className="object-cover h-full w-full rounded-full"
                                width={100}
                                height={100}
                                priority
                              />
                            </div>
                          </div>

                          <div className="flex flex-col justify-center font-poppins">
                            <p className="text-sm sm:text-lg font-semibold">
                              {employee.role}
                            </p>
                            <p className="text-sm sm:text-lg">
                              {employee.name}
                            </p>
                            <p className="text-sm sm:text-2xl font-semibold text-blue-900">
                              {employee.phone}
                            </p>
                            <p className="text-sm">{employee.email}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>

            <div className="md:col-span-3 p-8 lg:p-12 shadow-lg bg-white rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="col-span-2 w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black "
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
      </div>
    </div>
  );
};

export default Enquiry;
