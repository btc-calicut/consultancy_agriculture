import React from "react";
import data from "@public/assets/data.json";

const aboutUsData = data.aboutus;

const Location = () => {
  return (
    <div id="location" className="bg-white w-full py-7">
      <div className="px-4 sm:px-10 md:px-14 lg:px-36">
        <div className="grid grid-cols-1 mb-14 py-5 px-8 text-center xs:text-left xs:grid-cols-2 gap-x-14">
          <div className="flex flex-col justify-center items-center text-center mb-10">
            <h1 className="mb-8 text-center text-[#0b0924] font-semibold text-[27px] xs:mb-14 text-[35px] leading-normal w-full">
              Location
            </h1>
            <p className="text-[16px] leading-[28px]">
              {aboutUsData.operations.location}
            </p>
          </div>
          <div>
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3912.9572294605623!2d75.815268575049!3d11.264554388915451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDE1JzUyLjQiTiA3NcKwNDknMDQuMiJF!5e0!3m2!1sen!2sin!4v1693665877676!5m2!1sen!2sin"
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
