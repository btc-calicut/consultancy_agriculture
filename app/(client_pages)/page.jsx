import LinkToProducts from "@sections/LinkToProducts";
import About from "@sections/About";
import Enquiry from "@sections/Enquiry";
import Location from "@sections/Location";

// This config is only required for antd and not related to project.
import { ConfigProvider } from "antd";
import theme from "@theme/themeConfig";

const HomePage = () => {
  return (
    <ConfigProvider theme={theme}>
      <section className="w-full">
        <LinkToProducts />
        <About />
        <Enquiry />
        <Location />
      </section>
    </ConfigProvider>
  );
};

export default HomePage;
