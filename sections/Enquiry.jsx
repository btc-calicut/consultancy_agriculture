"use client";

import { useState, useEffect } from "react";
import data from "@public/assets/data.json";
import Image from "next/image";
import { Carousel } from "antd";

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
        <h1 className="text-[#0b0924] font-semibold text-[27px] xs:text-[35px] w-full">
          Want to talk to us?
        </h1>
        <div className="py-10 xs:py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-16 gap-y-8">
            <div className="md:col-span-2 mx-3 md:my-3 flex md:flex-col items-center justify-center">
              <div className="m-1 max-xs:hidden text-xl xs:text-[40px] tracking-wide leading-relaxed font-bold">
                <h1 className="text-indigo-900 font-sans">Meet our team</h1>
              </div>
              <div className="p-2 w-64 xs:w-2/3 md:w-full h-fit md:h-80 border rounded-lg bg-zinc-50 shadow-lg">
                <Carousel dots={false} autoplay>
                  {data.employees.map((employee, index) => {
                    return (
                      <div key={index}>
                        <div className="md:h-80 flex md:flex-col items-center justify-center gap-y-6">
                          <div className="max-md:w-1/3">
                            <div className="mx-2 w-16 xs:w-20 h-16 xs:h-20 overflow-hidden">
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

                          <div className="mx-2 flex flex-col justify-center font-poppins">
                            <p className="text-sm xs:text-lg font-semibold">
                              {employee.role}
                            </p>
                            <p className="text-sm xs:text-lg">
                              {employee.name}
                            </p>
                            <p className="text-sm xs:text-2xl font-semibold text-blue-900">
                              {employee.phone}
                            </p>
                            <p className="text-xs">{employee.email}</p>
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
