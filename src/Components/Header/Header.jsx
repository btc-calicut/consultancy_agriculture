import React from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        
        <Menu.Item key="1">About</Menu.Item>
        <Menu.Item key="2">Products</Menu.Item>
        <Menu.Item key="3">Enquiries</Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
