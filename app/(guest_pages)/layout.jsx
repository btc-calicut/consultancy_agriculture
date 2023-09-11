import Header from "@components/Header";
import ScrollToTop from "@components/ScrollToTop";
import FooterComponent from "@components/Footer";

const ClientHomeLayout = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
      <ScrollToTop />
      <FooterComponent />
    </section>
  );
};

export default ClientHomeLayout;
