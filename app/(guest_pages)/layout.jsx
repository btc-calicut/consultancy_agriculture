import Header from "@components/Header";
import ScrollToTop from "@components/ScrollToTop";
import FooterComponent from "@components/Footer";

// This config is only required for antd and not related to project.
import { ConfigProvider } from "antd";
import theme from "@theme/themeConfig";

const ClientHomeLayout = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <section>
        <Header />
        {children}
        <ScrollToTop />
        <FooterComponent />
      </section>
    </ConfigProvider>
  );
};

export default ClientHomeLayout;
