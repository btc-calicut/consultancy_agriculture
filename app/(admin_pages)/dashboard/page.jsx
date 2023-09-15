"use client";

import { message } from "antd";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();

  const testApi = async () => {
    try {
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${session.data?.user?.accessToken}` // this doesnt work
          Authorization: session.data?.user?.accessToken, // send accesstoken from session as header
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 401) {
        message.error("Session expired. Please login again");
        setTimeout(() => {
          signOut();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-full">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          All products
        </h1>
      </div>

      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <button
          className="p-3 border rounded-md shadow-md hover:bg-gray-200 transition ease-in-out duration-300"
          onClick={testApi}
        >
          Click to test api
        </button>
        <br />
        <button
          className="p-3 border rounded-md shadow-md hover:bg-gray-200 transition ease-in-out duration-300"
          onClick={() => signOut()}
        >
          Signout
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
