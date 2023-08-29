import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { Breadcrumb } from "antd";

const Products = () => {
  return (
    <>
      <Header />
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
        <div className="bg-violet-100 h-screen">
          <h1 className="p-5 font-poppins">Our Products</h1>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Products;
