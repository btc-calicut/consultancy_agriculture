"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "@public/assets/logo.png";

const Header = () => {
  const [selectedKey, setSelectedKey] = useState("about");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const MenuContents = [
    {
      label: "Location",
      key: "location",
    },
    {
      label: "Enquiry",
      key: "enquiry",
    },
    {
      label: "About",
      key: "about",
    },
  ];

  const handleMenuClick = (item) => {
    setSelectedKey(item.key);

    if (pathname === "/") {
      scrollToComponent(item.key);
    } else {
      // first navigate to landing page and then scroll to section
      router.push("/");
      setTimeout(() => {
        scrollToComponent(item.key);
      }, 500);
    }

    if (drawerVisible) {
      setDrawerVisible(false);
    }
  };

  const scrollToComponent = (componentId) => {
    const element = document.getElementById(componentId);
    const navbarHeight = 80;
    if (element) {
      const elementTop = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 px-4 flex items-center justify-end backdrop-blur-xl bg-white/75 shadow-lg">
      <div className="flex gap-2 items-center w-full">
        <Image
          alt="logo"
          src={logo}
          height={55}
          width={55}
          className="object-cover rounded-full my-2 bg-white"
        />
        <p className="hidden md:inline font-semibold text-lg text-black tracking-wide">
          | BTC
        </p>
        <p className="max-xs:hidden max-md:inline hidden font-semibold text-2xl text-black tracking-wide">
          BTC
        </p>
      </div>

      {/* Desktop view */}

      <div className="hidden sm:flex w-full">
        <div className="bg-transparent border-none w-full flex flex-row-reverse gap-x-6 font-poppins">
          {MenuContents.map((menu) => {
            const isSelected = menu.key === selectedKey;
            return (
              <a
                className={`cursor-pointer relative inline-block text-black group ${
                  isSelected
                    ? "transition duration-300 ease-in-out text-blue-600"
                    : ""
                }`}
                onClick={() => handleMenuClick(menu)}
                key={menu.key}
              >
                {menu.label}
                <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </a>
            );
          })}
        </div>
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
          className={`fixed top-0 left-0 right-0 h-80 flex flex-col-reverse items-center justify-center space-y-10 transition duration-500 ease-in-out backdrop-blur-2xl bg-[#050414]/90 text-white ${
            (drawerVisible ? "shadow-2xl" : "",
            drawerVisible ? "none" : "translate-y-[-100%]")
          }`}
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
