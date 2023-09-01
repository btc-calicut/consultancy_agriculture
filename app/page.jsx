import About from "@sections/About";
import LinkToProducts from "@sections/LinkToProducts";
import Enquiry from "@sections/Enquiry";
import Location from "@sections/Location";

const Home = () => {
  return (
    <div className="w-full">
      <LinkToProducts />
      <About />
      <Enquiry />
      <Location />
    </div>
  );
};

export default Home;
