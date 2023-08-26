import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import logo from "../../assets/logo.png";

const HeaderComponent = () => {
  const [selectedKey, useSelectedKey] = useState("about");
  const navigate = useNavigate();

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
    useSelectedKey(`${item.key}`);
    navigate(`/#${item.key}`);
  };

  return (
    <div className="px-3 flex items-center justify-between bg-white">
      <div className="rounded-full w-20 h-20 overflow-hidden">
        <img alt="" src={logo} className="object-cover h-full w-full" />
      </div>
      <Menu
        className="w-full border-none flex flex-row-reverse"
        theme="light"
        mode="horizontal"
        selectedKeys={selectedKey}
        items={MenuContents}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default HeaderComponent;
