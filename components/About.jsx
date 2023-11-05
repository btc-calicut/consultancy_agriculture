import React from "react";
import { Timeline } from "antd";
import Image from "next/image";

import data from "@public/assets/data.json";
import ourmission from "@public/images/ourmission.jpg";
import operations from "@public/images/operations.jpg";

const aboutUsData = data.aboutus;

export default function About() {
  return (
    <div id="about" className="w-full bg-background">
      <div className="py-20 px-6 sm:px-10 md:px-14 lg:px-36 backdrop-blur-3xl bg-white/90">
        <h2 className="mb-10 text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins sm:leading-[1.4]">
          About Us
        </h2>

        <div className="mb-10 sm:mb-24 text-left sm:grid grid-cols-2 sm:gap-x-7">
          <div>
            <h3 className="mb-6 xs:mb-12 text-3xl max-sm:text-2xl font-semibold">
              Our Mission
            </h3>
            <p className="text-[14px] xs:text-[16px] leading-[26px] xs:leading-[28px] text-justify text-gray-900">
              {aboutUsData.mission}
            </p>
          </div>
          <div className="relative hidden sm:block">
            <Image
              alt="mission"
              src={ourmission}
              className="object-cover rounded-2xl"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="mb-10 sm:mb-24 text-left sm:grid grid-cols-2 sm:gap-x-7">
          <div className="relative hidden sm:block">
            <Image
              alt="operations"
              src={operations}
              className="object-cover rounded-2xl"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
            />
          </div>
          <div>
            <h3 className="mb-6 xs:mb-12 text-3xl max-sm:text-2xl font-semibold">
              Our Operations
            </h3>
            <p className="text-[14px] xs:text-[16px] leading-[26px] xs:leading-[28px] text-justify text-gray-900">
              {aboutUsData.trading}
            </p>
          </div>
        </div>

        <div className="mb-10 sm:mb-24 text-left">
          <h3 className="mb-6 xs:mb-12 text-3xl max-sm:text-2xl font-semibold">
            Our Team
          </h3>
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
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRpACAABXRUJQVlA4WAoAAAAgAAAAHAEAvAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggogAAANAOAJ0BKh0BvQA/cbjZZbSvLCcgKAKQLglpbuF2oAAWlsnIe+2TkPfgCAe+2TkPgP0u14uTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32yciIHk5D32ych9C+l2vFych8B+l2vFych78AQD32ych77cy/T2ycKAA/uFO8+mfmtFtxm2ZdnDSYS00ZzyAgSvWI4AAXnJhAAAAAA=="
                    sizes="100vw"
                  />
                </div>
                <div className="p-6">
                  <h6 className="mb-4 font-sans text-base antialiased font-semibold leading-normal tracking-normal text-indigo-500 uppercase">
                    {teamMember.role}
                  </h6>
                  <h4 className="mb-2 font-sans text-2xl max-xs:text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {teamMember.name}
                  </h4>
                  <p className="font-sans text-[10px] xs:text-sm font-normal leading-[15px] xs:leading-relaxed text-gray-700">
                    {teamMember.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-left -mb-5">
          <h3 className="mb-6 xs:mb-12 text-3xl max-sm:text-2xl font-semibold">
            Our History
          </h3>
          <Timeline items={aboutUsData.history} mode="alternate" />
        </div>
      </div>
    </div>
  );
}
