import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Products = () => {
  return (
    <>
      <Header />
      <h1 className="bg-violet-100 h-screen mx-10">Our Products</h1>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Products;
