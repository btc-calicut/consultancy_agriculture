import Link from "next/link";
import { Carousel } from "antd";
import data from "@public/assets/data.json";
import Image from "next/image";

const LinkToProducts = () => {
  return (
    <div className="relative h-[80vh] lg:min-h-[430px]">
      <Carousel dots={false} autoplay>
        {data.picture.map((item, index) => {
          return (
            <div className="h-[80vh] relative lg:min-h-[430px]">
              <Image
                alt={item.name}
                key={index}
                src={item.path}
                className="object-cover xs:brightness-[.1]"
                fill
                priority
                sizes="100vw"
              />
              <div className="flex items-center justify-center xs:justify-start absolute inset-0">
                <div className=" py-3 xs:py-7 px-4 sm:px-10 md:px-14 lg:px-36">
                  <div className="flex flex-col items-center xs:items-start h-full">
                    <div className="flex flex-col py-6 gap-x-3 max-lg:gap-y-5">
                      <h1 className="text-[33px] xs:text-[40px] font-[1000] sm:leading-20 lg:leading-loose bg-gradient-to-r from-yellow-500 via-teal-400 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_5px_1.2px_rgba(0,0,0,0.8)] text-center xs:text-left">
                        Cultivating Quality, <br className="max-xs:block" />
                        Harvesting Opportunities,
                        <br className="max-xs:block sm:block" />
                        Trading the Future
                      </h1>
                      <p className="max-sm:hidden text-md w-full md:w-80 max-h-60 text-white md:leading-7 text-left">
                        Elevate your agricultural ventures with Team BTC, your
                        trusted partner in trading top-quality produce worldwide
                      </p>
                    </div>

                    <Link
                      href="/products"
                      className="relative w-40 h-10 my-2 xs:my-5 px-6 py-3 inline-flex items-center justify-center bg-white xs:bg-blue-950 border-white xs:border-blue-950 border-2 rounded-full shadow-xl overflow-hidden transition duration-300 ease-out group"
                    >
                      <span className="absolute inset-0 w-full h-full flex items-center justify-center text-white xs:text-blue-950 bg-blue-950 xs:bg-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
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
                      <span className="absolute w-full h-full flex items-center justify-center text-blue-950 xs:text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Take to Products
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default LinkToProducts;
