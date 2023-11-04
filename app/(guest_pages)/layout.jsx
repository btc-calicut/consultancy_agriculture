import Header from "@components/Header";
import ScrollToTop from "@components/ScrollToTop";
import FooterComponent from "@components/Footer";

export default function ClientHomeLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
      <ScrollToTop />
      <FooterComponent />
    </section>
  );
}
