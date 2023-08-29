import React from "react";
import data from "../../assets/data.json";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";

const About = () => {
  return (
    <div id="about" className="bg-white w-full">
      <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-7">
        <h1 className="font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
          About Us
        </h1>
        <p className="text-[18px] leading-[28px]">{data.aboutus}</p>

        {/* Testimonial section */}

        <div className="mt-3 w-full flex justify-between items-center flex-col md:flex-row">
          <h1 className="font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
            Hear from our customers
          </h1>
        </div>
        <div className="w-full flex flex-wrap justify-center sm:justify-start relative">
          {data.testimonials.map((testimonial) => {
            return <TestimonialCard key={testimonial.id} {...testimonial} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
