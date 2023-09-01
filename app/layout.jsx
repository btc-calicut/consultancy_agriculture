import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@components/Header";
import ScrollToTop from "@components/ScrollToTop";
import FooterComponent from "@components/Footer";

export const metadata = {
  title: "AgriCorp",
  description: "Buy the most organic agricultural products from us",
};

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.className}`}>
        {/* <div className="background_gradient" /> */}

        <div className="main">
          <Header />
          {children}
          <ScrollToTop />
          <FooterComponent />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
