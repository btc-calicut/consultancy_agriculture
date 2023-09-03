import { Poppins } from "next/font/google";
import "./globals.css";
import data from "@public/assets/data.json";
import StyledComponentsRegistry from "@lib/AntdRegistry";

export const metadata = {
  title: data.title,
  description: data.description,
};

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
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
        <main className="main">
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
