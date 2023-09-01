const LinkToProducts = () => {
  return (
    <div className="bg-zinc-100 w-full">
      <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-7">
        <div className="flex flex-col justify-center max-sm:items-center">
          <div className="flex flex-col gap-x-3 max-lg:gap-y-5">
            <h1 className="max-sm:text-center font-[1000] bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent sm:leading-20 lg:leading-loose text-[27px] xs:text-[40px]">
              Cultivating Quality, Harvesting Opportunities,
              <br className="hidden xs:block" />
              Trading the Future
            </h1>
            <p className="max-sm:hidden w-full max-h-60 md:w-80 text-md text-blue-950 md:leading-7">
              Elevate your agricultural ventures with Team BTC, your trusted
              partner in trading top-quality produce worldwide
            </p>
          </div>

          <a
            href="/products"
            class="my-5 bg-blue-950 border-blue-950 relative w-40 h-10 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 rounded-full shadow-lg group"
          >
            <span class=" text-indigo-900 absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="text-white absolute flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease">
              Take to Products
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkToProducts;
