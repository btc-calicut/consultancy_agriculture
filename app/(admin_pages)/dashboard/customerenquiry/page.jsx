"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import moment from "moment";
import CSVbutton from "@components/CSVbutton";

const { Search } = Input;

const CustomerEnquiry = () => {
  const session = useSession();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(session);
    if (session.status === "authenticated") {
      fetchData();
    }
  }, [session.status]);

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

  const onSearch = (value) => {
    setSearch(value);
  };

  let filteredData =
    data &&
    data.filter((info) => {
      return info.name.toLowerCase().includes(search.toLowerCase());
    });

  const dataSource = filteredData?.map((item, index) => ({
    key: index + 1,
    date: moment(item.date).format("YYYY-MM-DD"),
    name: item.name,
    email: item.email,
    number: item.number,
    message: item.message,
  }));

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      align: "center",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      },
      showSorterTooltip: false,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "center",
      render: (text) => {
        return text.toUpperCase();
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
      align: "center",
      render: (text) => {
        return text.toLowerCase();
      },
    },
    {
      title: "Phone number",
      dataIndex: "number",
      key: "number",
      width: 200,
      align: "center",
      render: (text) => {
        return text.toUpperCase();
      },
    },
    Table.EXPAND_COLUMN,
    // Table.SELECTION_COLUMN,
  ];

  return (
    <section className="min-h-screen  bg-zinc-100">
      <div className="p-4 px-6 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Customer Enquiry
        </h1>
      </div>
      <div className="p-5 space-y-3">
        <h1 className="font-poppins text-sm">Search by Name :</h1>
        <div className="flex flex-nowrap gap-x-2 items-center justify-between">
          <div className="w-5/6">
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              // enterButton
              style={{
                width: "100%",
              }}
            />
          </div>
          <CSVbutton data={filteredData} />
        </div>
      </div>

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
