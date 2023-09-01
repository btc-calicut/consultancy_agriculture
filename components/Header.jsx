"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "@public/assets/logo.png";

const Header = () => {
  const [selectedKey, setSelectedKey] = useState("about");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const router = useRouter();

  const MenuContents = [
    {
      label: "Enquiry",
      key: "enquiry",
    },
    {
      label: "Location",
      key: "location",
    },
    {
      label: "About",
      key: "about",
    },
  ];

  const handleMenuClick = (item) => {
    setSelectedKey(item.key);
    // first navigate to landing page and then scroll to section
    router.push("/");
    setTimeout(() => {
      scrollToComponent(item.key);
    }, 100);
    if (drawerVisible) {
      setDrawerVisible(false);
    }
  };

  const scrollToComponent = (componentId) => {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-10 px-3 flex items-center justify-between backdrop-blur-xl bg-white/75 shadow-md">
      <div className="flex gap-2 items-center w-full">
        <div className="bg-transparent rounded-full w-20 h-20 overflow-hidden">
          <Link href="/">
            <Image
              alt="logo"
              src={logo}
              className="object-cover h-full w-full"
            />
          </Link>
        </div>
        <p className="hidden md:inline font-semibold text-lg text-black tracking-wide">
          Blueway Trading Company
        </p>
      </div>

      {/* Desktop view */}

      <div className="hidden sm:flex w-full">
        <Menu
          className="bg-transparent border-none w-full flex flex-row-reverse font-poppins"
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={MenuContents}
          onClick={handleMenuClick}
        />
      </div>

      {/* Mobile view */}

      <div className="visible sm:hidden">
        <Button
          className={`border-none shadow-lg ${
            drawerVisible ? `hidden` : `visible`
          }`}
          icon={<MenuOutlined style={{ fontSize: "27px" }} />}
          onClick={() => setDrawerVisible(true)}
        />
        <div
          className={`z-50 fixed top-0 left-0 right-0 h-80 flex flex-col-reverse items-center justify-center space-y-10 duration-500 backdrop-blur-2xl bg-black/90 text-white ${
            drawerVisible ? "shadow-2xl" : ""
          }`}
          style={{
            transform: drawerVisible ? "none" : "translateY(-100%)",
          }}
        >
          <CloseOutlined
            className="fixed top-0 right-0 p-5 text-2xl"
            onClick={() => setDrawerVisible(false)}
          />
          {MenuContents.map((menu) => {
            return (
              <a
                className="cursor-pointer "
                onClick={() => handleMenuClick(menu)}
                key={menu.key}
              >
                {menu.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Header;
