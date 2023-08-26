import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="bg-gray-800 text-white">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p>
            Our company specializes in agro-product trading, offering a diverse
            range of quality products.
          </p>
        </Col>
        <Col xs={24} md={8}>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="list-inside list-disc">
            <li>
              <a href="#about" className="text-blue-300 hover:text-blue-400">
                About
              </a>
            </li>
            <li>
              <a href="#products" className="text-blue-300 hover:text-blue-400">
                Products
              </a>
            </li>
            <li>
              <a href="#contact" className="text-blue-300 hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </Col>
        <Col xs={24} md={8}>
          <h3 className="text-lg font-semibold">Contact</h3>
          <p>
            <MailOutlined /> example@email.com
          </p>
          <p>
            <PhoneOutlined /> 123-456-789
          </p>
        </Col>
      </Row>
      <Divider className="bg-gray-600" />
      <Row className="justify-center">
        <Col>
          <div className="flex space-x-4">
            <a href="#link" className="text-blue-400 hover:text-blue-500">
              <FacebookOutlined />
            </a>
            <a href="#link" className="text-blue-400 hover:text-blue-500">
              <TwitterOutlined />
            </a>
            <a href="#link" className="text-blue-400 hover:text-blue-500">
              <LinkedinOutlined />
            </a>
          </div>
        </Col>
      </Row>
      <Row className="justify-center mt-2">
        <Col>
          <p className="text-center text-sm">
            Copyright (c) 2023. All rights reserved.
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
