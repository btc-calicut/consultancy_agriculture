"use client";

import Link from "next/link";
import { useState } from "react";
import postNewsletter from "@utils/postNewsletter";
import { Row, Col, Divider, Input, Button, notification } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";

export default function Footer() {
  const [email, setEmail] = useState("");

  const [api, contextHolder] = notification.useNotification({
    placement: "top",
  });
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      description:
        "Thank you for subscribing to BTC. You will now receive our latest updates and offers",
      duration: 2.5,
      closeIcon: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailPattern.test(email)) {
      openNotificationWithIcon("success", "Subscribed");

      // post request to api
      try {
        const cpy_email = email;
        setEmail("");
        await postNewsletter(cpy_email);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="bg-gray-950 text-gray-400 p-8 xs:p-12">
      {contextHolder}
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
                value={email}
                onChange={handleChange}
              />
              <Button
                type="primary"
                onClick={handleSubmit}
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
              <Link
                href="https://facebook.com/"
                className="text-gray-400 hover:text-gray-300"
              >
                <FacebookOutlined className="text-white bg-gray-700 rounded-full p-2" />
              </Link>
              <Link
                href="https://twitter.com/"
                className="text-gray-400 hover:text-gray-300"
              >
                <TwitterOutlined className="text-white bg-gray-700 rounded-full p-2" />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                className="text-gray-400 hover:text-gray-300"
              >
                <LinkedinOutlined className="text-white bg-gray-700 rounded-full p-2" />
              </Link>
            </div>
          </div>
          <p className="font-poppins text-center text-sm">
            Copyright (c). All rights reserved.
          </p>

          <br />
          <p className="text-gray-600 font-poppins text-center text-sm">
            Blueway Trading Company
          </p>
        </Col>
      </Row>
    </div>
  );
}
