import Breadcrumb from "@components/Breadcrumb";

const ProductsPage = () => {
  return (
    <section className="w-full">
      <div className="mx-4 sm:mx-10 md:mx-14 lg:mx-36 my-6">
        <Breadcrumb />
        <div className="bg-zinc-100 h-screen">
          <h1 className="text-[#0b0924] font-semibold text-[27px] xs:text-[35px] leading-normal w-full">
            Our Products
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
