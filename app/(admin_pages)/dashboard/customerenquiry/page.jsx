"use client";

import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  Table.EXPAND_COLUMN,
  Table.SELECTION_COLUMN,
];

const CustomerEnquiry = () => {
  const data = [
    {
      name: "John",
      email: "john@example.com",
      phone: "123-456-7890",
      message: "Interested in your product",
    },
    {
      name: "Jane",
      email: "jane@example.com",
      phone: "098-765-4321",
      message: "Would like a demo",
    },
    {
      name: "Emily",
      email: "emily@example.com",
      phone: "333-333-3333",
      message: "How does this work?",
    },
    {
      name: "Dave",
      email: "dave@example.com",
      phone: "444-444-4444",
      message: "I need more information",
    },
    {
      name: "Sarah",
      email: "sarah@somemail.com",
      phone: "555-555-5555",
      message: "I have a question",
    },
    {
      name: "Mike",
      email: "Mike@mike.com",
      phone: "666-666-6666",
      message: "I have a question",
    },
    {
      name: "John",
      email: "john@example.com",
      phone: "123-456-7890",
      message: "Interested in your product",
    },
    {
      name: "Jane",
      email: "jane@example.com",
      phone: "098-765-4321",
      message: "Would like a demo",
    },
    {
      name: "Emily",
      email: "emily@example.com",
      phone: "333-333-3333",
      message: "How does this work?",
    },
    {
      name: "Dave",
      email: "dave@example.com",
      phone: "444-444-4444",
      message: "I need more information",
    },
    {
      name: "Sarah",
      email: "sarah@somemail.com",
      phone: "555-555-5555",
      message: "I have a question",
    },
    {
      name: "Mike",
      email: "Mike@mike.com",
      phone: "666-666-6666",
      message: "I have a question",
    },
    {
      name: "John",
      email: "john@example.com",
      phone: "123-456-7890",
      message: "Interested in your product",
    },
    {
      name: "Jane",
      email: "jane@example.com",
      phone: "098-765-4321",
      message: "Would like a demo",
    },
    {
      name: "Emily",
      email: "emily@example.com",
      phone: "333-333-3333",
      message: "How does this work?",
    },
    {
      name: "Dave",
      email: "dave@example.com",
      phone: "444-444-4444",
      message: "I need more information",
    },
    {
      name: "Sarah",
      email: "sarah@somemail.com",
      phone: "555-555-5555",
      message: "I have a question",
    },
    {
      name: "Mike",
      email: "Mike@mike.com",
      phone: "666-666-6666",
      message: "I have a question",
    },
  ];


  const dataSource = data.map((item, index) => ({
    key: index + 1,
    name: item.name,
    email: item.email,
    phone: item.phone,
    message: item.message,
  }));

  return (
    <section className="min-h-full">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Customer Enquiry Details
        </h1>
      </div>
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          expandable={{
            expandedRowRender: (record) => (
              <p>{record.message}</p>
            ),
          }}
          scroll={{ y: 500 }}
          bordered
        />
      </div>
    </section>
  );
};

export default CustomerEnquiry;

