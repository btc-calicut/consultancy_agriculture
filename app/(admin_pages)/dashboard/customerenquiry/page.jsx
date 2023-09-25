"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Table, Input, Space, message } from "antd";

const { Search } = Input;

const CustomerEnquiry = () => {
  const session = useSession();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (session.data?.user?.accessToken) {
      fetchData();
    }
  }, [session.data?.user?.accessToken]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/enquiry", {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${session.data?.user?.accessToken}` // this doesnt work
          Authorization: session.data?.user?.accessToken,
        },
      });
      const data = await response.json();
      setData(data.info);
      if (response.status === 401) {
        message.error("Session expired. Please login again");
        setTimeout(() => {
          signOut();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "number", key: "number" },
    Table.EXPAND_COLUMN,
    // Table.SELECTION_COLUMN,
  ];

  const dataSource = data.map((item, index) => ({
    key: index + 1,
    name: item.name,
    email: item.email,
    number: item.number,
    message: item.message,
  }));

  return (
    <section className="min-h-screen  bg-zinc-100">
      <div className="p-4 px-6 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Customer Enquiry
        </h1>
      </div>
      <Space className="p-5">
        <h1 className="font-poppins text-sm">Search by Name :</h1>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />
      </Space>

      <div className="px-5">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          expandable={{
            expandedRowRender: (record) => <p>{record.message}</p>,
          }}
          scroll={{ y: 500 }}
          bordered
        />
      </div>
    </section>
  );
};

export default CustomerEnquiry;
