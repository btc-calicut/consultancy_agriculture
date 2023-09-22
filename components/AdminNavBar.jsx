"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@public/images/light-logo.png";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  message,
  notification,
} from "antd";

const AdminNavBar = () => {
  const session = useSession();
  const path = usePathname();

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [selectedKey, setSelectedKey] = useState(path);

  const user = {
    name: session.data?.user?.username,
    email: session.data?.user?.email,
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

  const initialValues = {
    username: session.data?.user?.username,
  };

  const changePassword = () => {
    setIsModelOpen(true);
  };

  const onCancel = () => {
    form.resetFields();
    setIsModelOpen(false);
  };

  const validateConfirmPassword = (rule, value) => {
    // even though rule is not used, it must be used as parameter to the correct syntax
    return new Promise((resolve, reject) => {
      if (value && value !== form.getFieldValue("newpassword"))
        reject("The two passwords do not match");
      else resolve();
    });
  };

  const onHandleSubmit = async (newcredentials) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/changepassword`, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${session.data?.user?.accessToken}` // this doesnt work
          Authorization: session.data?.user?.accessToken, // send accesstoken from session as header
        },
        body: JSON.stringify(newcredentials),
      });
      const data = await response.json();

      if (response.status === 200) {
        setLoading(false);
        form.resetFields();
        form.setFieldsValue({
          username: newcredentials.username,
        });
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
        title="Change Password"
        open={isModelOpen}
        maskClosable={false} // this will make the Model not disappear even if we click outside the Model
        onCancel={onCancel}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          name="changepasswordform"
          initialValues={initialValues}
          onFinish={onHandleSubmit}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item name="username" label="Username">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="oldpassword"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please enter your old password",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="newpassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
            ]}
          >
            <Input placeholder="Donot reuse old password" type="password" />
          </Form.Item>
          <Form.Item
            name="confirmnewpassword"
            label="Confirm New Password"
            rules={[
              {
                required: true,
                message: "Please confirm your new password",
              },
              { validator: validateConfirmPassword },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7 }}>
            <Button
              className="bg-blue-500"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? "Updating..." : "Verify and Update password"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default AdminNavBar;
