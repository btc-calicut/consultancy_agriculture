import { Breadcrumb } from "antd";

const ProductPage = () => {
  return (
    <div className="w-full">
      <div className="mx-4 sm:mx-10 md:mx-14 lg:mx-36 my-6">
        <Breadcrumb
          className="mb-2"
          items={[
            {
              href: "/",
              title: (
                <>
                  <span>Home</span>
                </>
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
          <h1 className="text-[#06051c] font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
            Our Products
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
