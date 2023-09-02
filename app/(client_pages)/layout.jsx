import Header from "@components/Header";
import ScrollToTop from "@components/ScrollToTop";
import FooterComponent from "@components/Footer";

const HomeLayout = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
      <ScrollToTop />
      <FooterComponent />
    </section>
  );
};

export default HomeLayout;
