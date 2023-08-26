import React from "react";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Enquiry from "../../components/Enquiry/Enquiry";
import Footer from "../../Components/Footer/Footer";
import CardTransition from "../../components/CardTransition/CardTransition";
import LinkToProducts from "../../components/LinkToProducts/LinkToProducts";
import Location from "../../components/Location/Location";

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
    </>
  );
};

export default Landing;
