import React from "react";
import { CSVLink } from "react-csv";

const CSVbutton = ({ data }) => {
  let selectedData = [];
  if (data !== undefined || data != null) {
    selectedData = data.map((info) => {
      return {
        Date: info.date,
        Name: info.name,
        Email: info.email,
        Phone_number: info.number,
        Message: info.message,
      };
    });
  }

  return (
    <button className="p-1 px-2 m-2 bg-lime-600 hover:bg-lime-700 text-white font-sans rounded-md text-sm">
      <CSVLink filename="Customer Enquiry" data={selectedData}>
        Export
      </CSVLink>
    </button>
  );
};

export default CSVbutton;
