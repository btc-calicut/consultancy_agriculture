"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "@public/images/logo.png";
import Image from "next/image";

const AdminSignin = () => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setDisabled(true);

      // use the signin funtion of next-auth
      const response = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      // we dont need to json() the next-auth response
      if (response?.error) {
        message.error(response.error);
        return;
      }

      if (!response?.error && response?.ok) {
        message.success("Logged in");
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setDisabled(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        color: "white",
        fontSize: 24,
      }}
      spin
    />
  );

  return (
    <div className="h-screen flex max-md:items-center max-md:relative max-md:overflow-hidden max-md:justify-center max-md:bg-gradient-to-tr from-blue-600 to-purple-500">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
        <div className="p-4">
          <h1 className="text-white font-bold text-4xl font-sans">
            Blueway Trading Company
          </h1>
          <p className="text-white mt-1">We sell best products</p>
          <Link
            href="/"
            className="block w-fit text-center bg-white text-indigo-800 mt-4 py-2 px-2 rounded-2xl font-bold mb-2"
          >
            Go to Home
          </Link>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>

      <div className="md:hidden absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="md:hidden absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="md:hidden absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="md:hidden absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>

      <div className="flex md:w-1/2 justify-center p-10 bg-red-200 items-center max-md:z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white max-md:rounded-lg max-md:p-7 max-md:py-9"
        >
          <div className="hidden my-3 max-md:flex gap-2 items-center w-full">
            <Image
              alt="logo"
              src={logo}
              height={50}
              width={50}
              className="object-cover rounded-full my-3"
            />
            <p className="font-semibold text-2xl text-black tracking-wide">
              | BTC
            </p>
          </div>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Admin!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name="email"
              id="email"
              placeholder="Company Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={`block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 ${
              disabled ? `bg-blue-200 ` : `hover:bg-indigo-800`
            }`}
            disabled={disabled}
          >
            {disabled ? <Spin indicator={antIcon} /> : `Login`}
          </button>
          {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span> */}
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
