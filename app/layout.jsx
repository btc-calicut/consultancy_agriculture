import { Poppins } from "next/font/google";
import "./globals.css";

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
        <main className="main">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
