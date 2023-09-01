import { Breadcrumb } from "antd";
import Link from "next/link";

const ProductPage = () => {
  return (
    <section className="w-full">
      <div className="mx-4 sm:mx-10 md:mx-14 lg:mx-36 my-6">
        <Breadcrumb
          className="mb-2"
          items={[
            {
              title: (
                <Link href="/">
                  <span>Home</span>
                </Link>
              ),
            },
            {
              title: (
                <>
                  <span>Products</span>
                </>
              ),
            },
          ]}
        />
        <div className="bg-zinc-100 h-screen">
          <h1 className="text-[#0b0924] font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
            Our Products
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
