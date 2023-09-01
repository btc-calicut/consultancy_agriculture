"use client";

import { useState } from "react";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const allValuesFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    if (allValuesFilled) {
      console.log("Form submitted with data:", formData);
    }
    setFormData({
      name: "",
      email: "",
      number: "",
      message: "",
    });
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
      <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-7">
        <h1 className="text-[#0b0924] font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
          Want to talk to us?
        </h1>
        <div className="mx-auto max-w-screen-xl py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-16 gap-y-8">
            <div className="lg:col-span-2 flex lg:flex-col justify-between lg:justify-center lg:gap-y-20">
              <div>
                <p className="max-w-xl text-md xs:text-lg">Manager</p>
                <p className="xs:text-2xl text-sm font-bold text-blue-900">
                  0151 475 4450
                </p>
                <address className="mt-2 not-italic text-md xs:text-lg">
                  282 Kevin Brook
                </address>
              </div>
              <div>
                <p className="max-w-xl text-md xs:text-lg">Executive</p>
                <p className="xs:text-2xl text-sm font-bold text-blue-900">
                  0151 475 4450
                </p>
                <address className="mt-2 not-italic text-md xs:text-lg">
                  Imogeneborough, CA 58517
                </address>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="col-span-2 w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black "
                  placeholder="Name"
                  type="text"
                  name="name"
                  id="name"
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
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
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
