"use client";
import data from "@public/assets/data.json";
import { useState, useEffect } from "react";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.employees.length);
    }, 5000); // Change employee every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

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
      <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-9">
        <h1 className="text-[#0b0924] font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
          Want to talk to us?
        </h1>
        <div className="mx-auto max-w-screen-xl py-14 xs:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-16 gap-y-8">
            <div className="lg:col-span-2 flex lg:flex-col justify-between lg:justify-center lg:gap-y-20">
              {data.employees.map((employee, index) => (
                <div
                  key={index}
                  className={`max-lg:flex-1 p-6 border rounded-lg ${
                    currentIndex === index ? "block" : "hidden"
                  }`}
                >
                  <div className="flex items-center justify-center bg-gray-200 w-44 h-44 rounded-full mx-auto mb-4">
                    {" "}
                    {/* Adjusted the size */}
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-40 h-40 rounded-full object-cover"
                    />{" "}
                    {/* Adjusted the size */}
                  </div>
                  <p className="max-w-xl text-md xs:text-lg">{employee.role}</p>
                  <p className="xs:text-2xl text-sm font-bold text-blue-900">
                    {employee.phone}
                  </p>
                  <h2 className="mt-2 not-italic text-md xs:text-lg">
                    {employee.name} <br />
                    <span className="text-sm">{employee.email}</span>
                  </h2>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
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
