"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@public/images/light-logo.png";
import { Avatar, Modal, message, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AdminNavBar = () => {
  const session = useSession();
  const path = usePathname();

  const user = {
    name: session.data?.user?.username,
    email: session.data?.user?.email,
  };

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState(path);
  const [formData, setFormData] = useState({
    username: "",
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    // Validate the confirmnewpassword field
    if (formData.confirmnewpassword !== formData.newpassword) {
      setError({
        ...error,
        confirmnewpassword: "Confirm password must match new password",
      });
    } else {
      setError({
        ...error,
        confirmnewpassword: "",
      });
    }
  }, [formData.confirmnewpassword]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/changepassword`, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${session.data?.user?.accessToken}` // this doesnt work
          Authorization: session.data?.user?.accessToken, // send accesstoken from session as header
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status === 200) {
        setLoading(false);
        // closing the model
        setTimeout(() => {
          setIsModelOpen(false);
        }, 1000);
        openNotificationWithIcon("success", data.message);
        // signout the user
        setTimeout(() => {
          signOut();
        }, 5000);
      } else if (response.status === 401) {
        message.error("Session expired. Please login again");
        setTimeout(() => {
          signOut();
        }, 2000);
      } else if (response.status === 400) {
        message.error(data.message);
      } else if (response.status === 500) {
        message.error("Please try again");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [api, contextHolder] = notification.useNotification({
    placement: "top",
  });

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: "Success",
      description: message,
    });
  };

  const navigation = [
    { name: "All products", href: "/dashboard", key: "/dashboard" },
    {
      name: "Add products",
      href: "/dashboard/addproducts",
      key: "/dashboard/addproducts",
    },
    {
      name: "Customer enquiry",
      href: "/dashboard/customerenquiry",
      key: "/dashboard/customerenquiry",
    },
  ];

  const changePassword = () => {
    setIsModelOpen(true);
  };

  const onCancel = () => {
    setFormData({
      username: "",
      oldpassword: "",
      newpassword: "",
      confirmnewpassword: "",
    });
    setIsModelOpen(false);
  };

  return (
    <section>
      {contextHolder}
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={logo}
                      alt="Your Company"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => {
                        const isSelected = item.key === selectedKey;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setSelectedKey(item.key)}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                              isSelected
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="ml-4 flex items-center sm:ml-6">
                    {/* Notification button for desktop */}
                    {/* <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    {/* Profile dropdown menu*/}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Avatar
                            style={{
                              backgroundColor: "#87d068",
                            }}
                          >
                            B
                          </Avatar>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={changePassword}
                                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                                  active ? "bg-gray-100" : ""
                                }`}
                              >
                                Change password
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => signOut()}
                                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                                  active ? "bg-gray-100" : ""
                                }`}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => {
                  const isSelected = item.key === selectedKey;

                  return (
                    <Link href={item.href} key={item.name}>
                      <Disclosure.Button
                        onClick={() => setSelectedKey(item.key)}
                        className={`w-full block rounded-md px-3 py-2 text-left font-medium ${
                          isSelected
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                      }}
                    >
                      B
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>

                  {/* Notification button for mobile devices*/}

                  {/* <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    className="w-full block text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={changePassword}
                  >
                    Change password
                  </Disclosure.Button>
                  <Disclosure.Button
                    className="w-full block text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Modal
        title={
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
        }
        open={isModelOpen}
        maskClosable={false} // this will make the Model not disappear even if we click outside the Model
        onCancel={onCancel}
        okButtonProps={{ style: { display: "none" } }}
      >
        <form
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          onSubmit={onHandleSubmit}
        >
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
              defaultValue={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="oldpassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Old Password
            </label>
            <input
              type="password"
              name="oldpassword"
              id="oldpassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.oldpassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="newpassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.newpassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="confirmnewpassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>

            <input
              type="password"
              name="confirmnewpassword"
              id="confirmnewpassword"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.confirmnewpassword}
              onChange={handleChange}
            />
            {error.confirmnewpassword && (
              <p className="text-red-500">{error.confirmnewpassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading || error.confirmnewpassword}
          >
            {loading ? (
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            ) : (
              "Reset password"
            )}
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default AdminNavBar;
