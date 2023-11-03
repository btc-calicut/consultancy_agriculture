import Link from "next/link";
import { Carousel } from "antd";
import data from "@public/assets/data.json";
import Image from "next/image";

const LinkToProducts = () => {
  return (
    <div className="h-[85vh] xs:h-[460px] relative lg:min-h-[430px]">
      <Carousel dots={false} autoplay>
        {data.picture.map((item, index) => {
          return (
            <div key={index}>
              <div className="h-[85vh] xs:h-[460px] relative lg:min-h-[430px]">
                <Image
                  alt={item.name}
                  src={item.path}
                  className="object-cover brightness-[.5]"
                  fill
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
      <div className="flex items-center justify-center xs:justify-start absolute inset-0">
        <div className=" py-3 xs:py-7 px-4 sm:px-10 md:px-14 lg:px-36">
          <div className="flex flex-col xs:items-start h-full">
            <div className="flex flex-col py-2 gap-x-3 max-lg:gap-y-5">
              <h1 className="py-1 max-xs:pl-4 text-[60px] font-[1000] leading-[70px] sm:leading-20 lg:leading-loose bg-gradient-to-r from-sky-400 via-teal-200 to-white bg-clip-text text-transparent font-poppins">
                Serving Your <br className="block xs:hidden" /> Needs
              </h1>
              <p className="max-xs:pl-4 text-md w-full md:w-80 max-h-60 text-white md:leading-7 text-left">
                Elevate your agricultural ventures with Blueway Trading Company,
                your trusted partner in trading top-quality produce worldwide
              </p>
            </div>

            <Link
              href="/products"
              className="relative max-xs:ml-3 w-40 h-10 my-2 xs:mb-6 px-6 py-3 inline-flex items-center justify-center bg-gradient-to-tl from-blue-700 via-blue-800 to-indigo-950 rounded-full shadow-3xl overflow-hidden transition duration-300 ease-out group"
            >
              <span className="absolute inset-0 w-full h-full flex items-center justify-center text-blue-900 bg-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="select-none absolute w-full h-full flex items-center justify-center text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                Take to Products
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkToProducts;
