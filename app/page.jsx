import CardTransition from "@sections/CardTransition";
import About from "@sections/About";
import LinkToProducts from "@sections/LinkToProducts";
import Enquiry from "@sections/Enquiry";
import Location from "@sections/Location";

const Home = () => {
  return (
    <div className="w-full">
      <CardTransition />
      <LinkToProducts />
      <About />
      <Enquiry />
      <Location />
    </div>
  );
};

export default Home;
