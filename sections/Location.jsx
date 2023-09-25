import React from "react";

const Location = () => {
  return (
    <div id="location" className="bg-zinc-50 w-full">
      <div className="px-6 sm:px-10 md:px-14 lg:px-36 py-20">
        <h1 className="text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins py-4 sm:leading-[1.2]">
          Locate Us Here
        </h1>
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3912.9572294605623!2d75.815268575049!3d11.264554388915451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDE1JzUyLjQiTiA3NcKwNDknMDQuMiJF!5e0!3m2!1sen!2sin!4v1693665877676!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="mt-6 border border-sky-100 rounded-lg shadow-md"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
export default Location;
