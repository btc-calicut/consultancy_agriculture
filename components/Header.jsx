"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "@public/images/logo.png";

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
    const navbarHeight = document.getElementById("navbar");
    if (element) {
      const elementTop = element.offsetTop - navbarHeight.offsetHeight;
      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="navbar"
      className="sticky top-0 z-40 px-5 py-1 xs:py-2 flex items-center justify-end backdrop-blur-md bg-white/50 shadow-xl"
    >
      <div className="flex gap-x-1 xs:gap-x-2 items-center w-full">
        <Image
          alt="logo"
          src={logo}
          height={33}
          width={33}
          className="object-cover rounded-full my-3"
        />
        <p className="text-4xl mb-2 font-thin font-playfair-display">|</p>
        <p className="font-thin font-playfair-display text-xl xs:text-2xl text-black tracking-wide">
          BTC
        </p>
      </div>

      {/* Desktop view */}

      <div className="hidden sm:flex w-full">
        <div className="bg-transparent border-none w-full flex flex-row-reverse gap-x-8 font-poppins">
          {MenuContents.map((menu) => {
            const isSelected = menu.key === selectedKey;
            return (
              <a
                className={`cursor-pointer relative inline-block text-black group ${
                  isSelected
                    ? "transition duration-300 ease-in-out text-blue-800"
                    : ""
                }`}
                onClick={() => handleMenuClick(menu)}
                key={menu.key}
              >
                {menu.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile view */}

      <div className="visible sm:hidden">
        <button
          className={`flex items-center border-none ${
            drawerVisible ? `hidden` : `visible`
          }`}
          onClick={() => setDrawerVisible(true)}
        >
          <MenuOutlined style={{ fontSize: "30px" }} />
        </button>

        <div
          className={`fixed top-0 left-0 right-0 h-80 flex flex-col-reverse items-center justify-center space-y-10 transition duration-200 ease-in-out backdrop-blur-2xl bg-[#050414]/90 text-white ${
            drawerVisible ? `block` : `translate-y-[-100%]`
          }`}
        >
          <CloseOutlined
            className="fixed top-0 right-0 p-5 text-2xl"
            onClick={() => setDrawerVisible(false)}
          />
          {MenuContents.map((menu) => {
            return (
              <a
                className="cursor-pointer text-lg"
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
