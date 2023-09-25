import LinkToProducts from "@sections/LinkToProducts";
import About from "@sections/About";
import Contact from "@sections/Contact";
import Enquiry from "@sections/Enquiry";
import Location from "@sections/Location";

const HomePage = () => {
  return (
    <section className="w-full">
      <LinkToProducts />
      <About />
      <Contact />
      <Enquiry />
      <Location />
    </section>
  );
};

export default HomePage;
