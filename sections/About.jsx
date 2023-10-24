import React from "react";
import { Timeline } from "antd";
import Image from "next/image";

import data from "@public/assets/data.json";

const aboutUsData = data.aboutus;

const About = () => {
  return (
    <div
      id="about"
      className="w-full h-full bg-[url('/images/background.jpg')]"
    >
      <div className="px-5 sm:px-10 md:px-14 lg:px-36 py-20 backdrop-blur-md bg-zinc-100/90">
        <h1 className="mb-6 xs:mb-8 text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins py-4 sm:leading-[1.2]">
          About Us
        </h1>
        <div className="mb-10 py-3 xs:py-5 sm:px-4 px-8 text-center sm:text-left sm:grid grid-cols-2 sm:gap-x-7">
          <div>
            <h3 className="text-3xl font-semibold mb-4 sm:mb-6">Our Mission</h3>
            <p className="text-[16px] leading-[28px] text-justify">
              {aboutUsData.mission}
            </p>
          </div>
          <div className="relative hidden sm:block">
            <Image
              alt="team"
              src="/images/ourmission.png"
              className="object-cover rounded-2xl"
              fill
              priority
            />
          </div>
        </div>
        <div className="mb-10 py-3 xs:py-5 sm:px-4 px-8 text-center sm:text-left sm:grid grid-cols-2 sm:gap-x-7">
          <div className="relative hidden sm:block">
            <Image
              alt="team"
              src="/images/pict2.jpg"
              className="object-cover rounded-2xl"
              fill
              priority
            />
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-4 sm:mb-10 ">
              Our Operations
            </h3>
            <p className="text-[16px] leading-[28px] text-justify">
              {aboutUsData.trading}
            </p>
          </div>
        </div>

        <div className="mb-10 py-3 xs:py-5 sm:px-4 text-center sm:text-left">
          <h3 className="text-3xl font-semibold mb-4 sm:mb-10 ">Our Team</h3>
          <div className="text-center grid lg:grid-cols-2 gap-4">
            {aboutUsData.team.map((teamMember, index) => (
              <div
                key={index}
                className="flex flex-row w-full max-w-[48rem] h-full rounded-xl bg-white text-gray-700 shadow-md"
              >
                <div className="relative w-2/5 overflow-hidden text-gray-700 bg-white rounded-r-none shrink-0 rounded-xl bg-clip-border">
                  <Image
                    alt={teamMember.name}
                    src={teamMember.image}
                    className="object-cover w-full h-full"
                    fill
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h6 className="mb-4 font-sans text-base antialiased font-semibold leading-normal tracking-normal text-indigo-500 uppercase">
                    {teamMember.role}
                  </h6>
                  <h4 className="mb-2 font-sans text-2xl max-xs:text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {teamMember.name}
                  </h4>
                  <p className="font-sans text-base max-xs:text-sm font-normal leading-relaxed max-xs:leading-[16px] text-gray-700">
                    {teamMember.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-3 sm:px-4 px-8 text-center sm:text-left">
          <h3 className="text-3xl font-semibold mb-12">Our History</h3>
          <Timeline items={aboutUsData.history} color="red" mode="alternate" />
        </div>
      </div>
    </div>
  );
};

export default About;
