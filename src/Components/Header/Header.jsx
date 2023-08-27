import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";

const HeaderComponent = () => {
  const [selectedKey, setSelectedKey] = useState("about");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="px-3 flex items-center justify-between bg-white">
      <div className="rounded-full w-20 h-20 overflow-hidden">
        <img alt="" src={logo} className="object-cover h-full w-full" />
      </div>
      <div className="hidden md:flex w-full">
        <Menu
          className="border-none w-full flex flex-row-reverse"
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={MenuContents}
          onClick={handleMenuClick}
        />
      </div>
      <div className="md:hidden">
        <Button
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
        <Drawer
          height={280}
          style={{ background: "rgba(225, 226, 227, 0.99)" }}
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          placement="top"
        >
          <Menu
            style={{
              background: "transparent",
              border: "none",
            }}
            theme="light"
            mode="vertical"
            selectedKeys={[selectedKey]}
            items={MenuContents}
            onClick={handleMenuClick}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default HeaderComponent;
