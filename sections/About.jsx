import data from "@public/assets/data.json";

const About = () => {
  return (
    <div id="about" className="bg-white w-full">
      <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-7">
        <h1 className="text-[#06051c] font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
          About Us
        </h1>
        <p className="text-[16px] leading-[28px]">{data.aboutus}</p>

        {/* Testimonial section */}
      </div>
    </div>
  );
};

export default About;
