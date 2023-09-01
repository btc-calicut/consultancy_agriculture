import LinkToProducts from "@sections/LinkToProducts";
import About from "@sections/About";
import Enquiry from "@sections/Enquiry";
import Location from "@sections/Location";

const Home = () => {
  return (
    <section className="w-full">
      <LinkToProducts />
      <About />
      <Enquiry />
      <Location />
    </section>
  );
};

export default Home;
