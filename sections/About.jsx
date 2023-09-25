import React from "react";
import { Timeline } from "antd";
import Image from "next/image";

import data from "@public/assets/data.json";

const aboutUsData = data.aboutus;

const About = () => {
  return (
    <div id="about" className="bg-zinc-100 w-full h-full">
      <div className="px-5 sm:px-10 md:px-14 lg:px-36 py-10">
        <h1 className="mb-6 xs:mb-8 text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins py-4 sm:leading-[1.2]">
          About Us
        </h1>
        <div className="mb-10 py-5 sm:px-4 px-8 text-center sm:text-left sm:grid grid-cols-2 sm:gap-x-7 gap-x-14">
          <div>
            <h3 className="text-2xl font-semibold mb-4 sm:mb-6">Our Mission</h3>
            <p className="text-[16px] leading-[28px]">{aboutUsData.mission}</p>
          </div>
          <div className="hidden sm:block">
            <Image
              alt="team"
              src="/images/pict2.jpg"
              className="object-cover rounded-2xl"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
        <div className="mb-10 py-5 sm:px-4 px-8 text-center sm:text-left sm:grid grid-cols-2 sm:gap-x-7 gap-x-14">
          <div className="hidden sm:block">
            <Image
              alt="team"
              src="/images/pict2.jpg"
              className="object-cover rounded-2xl"
              width={500}
              height={500}
              priority
            />
          </div>
          <div>
            <h3 className="text-2xl  font-semibold mb-4 sm:mb-10 ">
              Our Operations
            </h3>
            <p className="text-[16px] leading-[28px]">{aboutUsData.trading}</p>
          </div>
        </div>

        <div className="mb-10 py-5 sm:px-4 text-center sm:text-left">
          <h3 className="text-2xl font-semibold mb-4 sm:mb-10 ">Our Team</h3>
          <div className="text-center px-6 sm:px-18 md:px-25 sm:grid grid-cols-2 sm:gap-x-6">
            {aboutUsData.team.map((teamMember, index) => (
              <div
                key={index}
                className="my-5 md:m-6 sm:p-4 p-8 flex flex-col items-center rounded-lg shadow-md bg-gradient-to-tr from-slate-100 to-yellow-50"
              >
                <div className="mb-4 w-16 sm:w-20 h-16 sm:h-20 overflow-hidden">
                  <Image
                    alt={teamMember.name}
                    src={teamMember.image}
                    className="object-cover h-full w-full rounded-full"
                    width={100}
                    height={100}
                    priority
                  />
                </div>

                <h4 className="text-lg mb-6 font-semibold">
                  {teamMember.name}
                </h4>
                <p className="text-[16px] leading-7 tracking-wide">
                  {teamMember.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-5 sm:px-4 px-8 text-center sm:text-left">
          <h3 className="text-2xl font-semibold mb-12">Our History</h3>
          <Timeline items={aboutUsData.history} color="red" mode="alternate" />
        </div>
      </div>
    </div>
  );
};

export default About;
