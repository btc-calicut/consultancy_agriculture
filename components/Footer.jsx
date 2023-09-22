"use client";

import { Layout, Row, Col, Divider, Input, Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <div className="bg-gray-950 text-gray-400 py-8 px-12">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div className="flex flex-col space-y-4 h-full">
            <div className="border border-gray-700 rounded-md p-4 bg-gray-800 flex-grow shadow-lg">
              <h3 className="font-poppins text-lg font-semibold text-gray-300">
                Contact Us
              </h3>
              <div className="flex flex-col space-y-4 mt-4">
                <a
                  href="mailto:btccalicut@outlook.com"
                  className="text-gray-400 hover:text-gray-300 flex items-center space-x-2"
                >
                  <MailOutlined className="text-white bg-gray-700 rounded-full p-2" />
                  <span className="font-poppins">
                    Email: btccalicut@outlook.com
                  </span>
                </a>
                <a
                  href="tel:04952967448"
                  className="text-gray-400 hover:text-gray-300 flex items-center space-x-2"
                >
                  <PhoneOutlined className="text-white bg-gray-700 rounded-full p-2" />
                  <span className="font-poppins">Call Us: 04952967448</span>
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="border border-gray-700 rounded-md p-4 bg-gray-800 h-full shadow-lg">
            <h3 className="font-poppins text-lg font-semibold text-gray-300">
              NEWSLETTER!
            </h3>
            <div className="flex flex-col space-y-4 mt-4">
              <p className="font-poppins text-gray-400">
                Be the first to know the latest offers on our products
              </p>
              <Input
                placeholder="Your email"
                className="bg-gray-500 text-white border-gray-600"
              />
              <Button
                type="primary"
                className="font-poppins"
                icon={<SendOutlined className="text-white" />}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Divider className="bg-gray-700" />
      <Row className="justify-center mt-2">
        <Col className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="flex space-x-4 items-center">
              <a href="#facebook" className="text-gray-400 hover:text-gray-300">
                <FacebookOutlined className="text-white bg-gray-700 rounded-full p-2" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-gray-300">
                <TwitterOutlined className="text-white bg-gray-700 rounded-full p-2" />
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-gray-300">
                <LinkedinOutlined className="text-white bg-gray-700 rounded-full p-2" />
              </a>
            </div>
          </div>
          <p className="font-poppins text-center text-sm">
            Copyright (c) . All rights reserved.{" "}
          </p>

          <br />
          <p className="text-gray-600 font-poppins text-center text-sm">
            Blueway Trading Company
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default FooterComponent;
