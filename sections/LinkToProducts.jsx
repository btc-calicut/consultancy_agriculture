import Link from "next/link";
import { Carousel } from "antd";
import data from "@public/assets/data.json";
import Image from "next/image";

const LinkToProducts = () => {
  return (
    <div className="relative h-96">
      <Carousel dots={false} autoplay>
        {data.picture.map((item, index) => {
          return (
            <div className="h-96">
              <Image
                alt={item.name}
                key={index}
                src={item.path}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          );
        })}
      </Carousel>

      <div className="absolute inset-0 flex items-center">
        <div className="py-7 px-4 sm:px-10 md:px-14 lg:px-36">
          <div className="flex flex-col justify-center max-sm:items-center">
            <div className="flex flex-col gap-x-3 max-lg:gap-y-5">
              <h1 className="text-[27px] xs:text-[40px] font-[1000] max-sm:text-center sm:leading-20 lg:leading-loose bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent">
                Cultivating Quality, Harvesting Opportunities,
                <br className="hidden xs:block" />
                Trading the Future
              </h1>
              <p className="max-sm:hidden text-md w-full md:w-80 max-h-60 text-blue-950 md:leading-7">
                Elevate your agricultural ventures with Team BTC, your trusted
                partner in trading top-quality produce worldwide
              </p>
            </div>

            <Link
              href="/products"
              className="relative w-40 h-10 my-5 px-6 py-3 inline-flex items-center justify-center bg-blue-950 border-blue-950 border-2 rounded-full shadow-lg overflow-hidden transition duration-300 ease-out group"
            >
              <span className="absolute inset-0 w-full h-full flex items-center justify-center text-indigo-900 bg-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
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
              <span className="absolute w-full h-full flex items-center justify-center text-white transition-all duration-300 transform group-hover:translate-x-full ease">
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
