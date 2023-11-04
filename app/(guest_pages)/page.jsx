import LinkToProducts from "@components/LinkToProducts";
import About from "@components/About";
import Contact from "@components/Contact";
import Enquiry from "@components/Enquiry";
import Location from "@components/Location";

export default function HomePage() {
  return (
    <section className="w-full">
      <LinkToProducts />
      <About />
      <Contact />
      <Enquiry />
      <Location />
    </section>
  );
}
