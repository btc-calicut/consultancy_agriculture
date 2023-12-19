"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Table, Input, message, Dropdown, Space } from "antd";
import { DownOutlined, IdcardTwoTone, MailTwoTone } from "@ant-design/icons";
import moment from "moment";
import getCustomerEnquiry from "@utils/getCustomerEnquiry";
import { CSVLink } from "react-csv";
import getSubscriberList from "@utils/getSubscriberList";

const { Search } = Input;

export default function CustomerEnquiry() {
  const session = useSession();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [subscribersList, setSubscribersList] = useState(null);

  useEffect(() => {
    if (session.status === "authenticated") {
      Promise.all([fetchData(), fetchSubscribersList()]);
    }
  }, [session.status]);

  const fetchData = async () => {
    // get request to api
    try {
      const accessToken = session.data?.user?.accessToken;
      const response = await getCustomerEnquiry(accessToken);
      const data = await response.json();

      if (response.status === 200) {
        setData(data.info);
      } else if (response.status === 401) {
        message.error("Session expired. Please login again");
        setTimeout(() => {
          signOut({ callbackUrl: "/auth/signin" });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubscribersList = async () => {
    try {
      const accessToken = session.data?.user?.accessToken;
      const response = await getSubscriberList(accessToken);
      const data = await response.json();
      if (response.status === 200) {
        setSubscribersList(data.info);
      } else if (response.status === 401) {
        message.error("Session expired. Please login again");
        setTimeout(() => {
          signOut({ callbackUrl: "/auth/signin" });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = (value) => {
    setSearch(value);
  };

  let filteredDataForSearch =
    data &&
    data.filter((info) => {
      return info.name.toLowerCase().includes(search.toLowerCase());
    });

  const dataSource = filteredDataForSearch?.map((item, index) => ({
    key: index + 1,
    date: moment(item.date).format("YYYY-MM-DD"),
    name: item.name,
    email: item.email,
    number: item.number,
    message: item.message,
  }));

  let dataForCustomerExport = filteredDataForSearch?.map((info) => {
    return {
      Date: info.date,
      Name: info.name,
      Email: info.email,
      Phone_number: info.number,
      Message: info.message,
    };
  });

  const columns = [
    Table.EXPAND_COLUMN,
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
    // Table.SELECTION_COLUMN,
  ];

  let dataForSubscriberListExport = subscribersList?.map((info) => {
    return {
      Date: info.date,
      Email: info.email,
    };
  });

  const items = [
    {
      key: "1",
      label: (
        <CSVLink filename="Customer Enquiry" data={dataForCustomerExport || []}>
          Enquiry list
        </CSVLink>
      ),
      icon: <IdcardTwoTone />,
    },
    {
      key: "2",
      label: (
        <CSVLink
          filename="Subscribers list"
          data={dataForSubscriberListExport || []}
        >
          Subscribers list
        </CSVLink>
      ),
      icon: <MailTwoTone />,
    },
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
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className="p-0.5 px-2 border-2 rounded-lg text-white bg-gray-950 shadow-md">
                Export
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
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
}
