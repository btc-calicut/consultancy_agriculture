import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";

const HeaderComponent = () => {
  const [selectedKey, setSelectedKey] = useState("about");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const MenuContents = [
    {
      label: "About",
      key: "about",
    },
    {
      label: "Enquiry",
      key: "enquiry",
    },
    {
      label: "Location",
      key: "location",
    },
  ];

  const handleMenuClick = (item) => {
    setSelectedKey(item.key);
    navigate(`/#${item.key}`);
    if (drawerVisible) {
      setDrawerVisible(false);
    }
  };

  return (
    <div className="px-3 flex items-center justify-between bg-white">
      <div className="rounded-full w-20 h-20 overflow-hidden">
        <img alt="" src={logo} className="object-cover h-full w-full" />
      </div>
      <div className="hidden md:flex">
        <Menu
          className="border-none"
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
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          placement="top"
        >
          <Menu
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
