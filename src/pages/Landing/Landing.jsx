import React from "react";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Enquiry from "../../sections/Enquiry/Enquiry";
import Footer from "../../Components/Footer/Footer";
import CardTransition from "../../sections/CardTransition/CardTransition";
import LinkToProducts from "../../sections/LinkToProducts/LinkToProducts";
import Location from "../../sections/Location/Location";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Landing = () => {
  return (
    <>
      <Header />
      <CardTransition />
      <LinkToProducts />
      <About />
      <Enquiry />
      <Location />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Landing;
