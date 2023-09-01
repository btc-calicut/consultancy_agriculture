"use client";

import { useRouter } from "next/navigation";

const LinkToProducts = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/products");
  };
  return (
    <div className="bg-zinc-100 h-60 w-full">
      <div className="px-4 sm:px-10 md:px-14 lg:px-36 py-7">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
            Browse our products
          </h1>
          <button
            className="border bg-black text-white rounded-full w-fit p-2 px-3"
            onClick={handleNavigate}
          >
            Click me
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkToProducts;
