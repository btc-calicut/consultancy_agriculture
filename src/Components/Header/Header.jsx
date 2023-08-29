import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";

const HeaderComponent = () => {
  const [selectedKey, setSelectedKey] = useState("about");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

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
    navigate("/");
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
      <div className="bg-transparent rounded-full w-20 h-20 overflow-hidden">
        <img alt="" src={logo} className="object-cover h-full w-full" />
      </div>
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

      <div className="visible sm:hidden">
        <Button
          className={`border-none shadow-lg ${
            drawerVisible ? `hidden` : `visible`
          }`}
          icon={<MenuOutlined style={{ fontSize: "27px" }} />}
          onClick={() => setDrawerVisible(true)}
        />
        <div
          className={`fixed top-0 left-0 right-0 z-20 h-60 flex flex-col-reverse items-center justify-center space-y-10 duration-500 backdrop-blur-xl bg-black/90 text-white ${
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
              <a onClick={() => handleMenuClick(menu)} key={menu.key}>
                {menu.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
