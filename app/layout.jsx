import { Poppins } from "next/font/google";
import "@styles/globals.css";
import data from "@public/assets/data.json";
import AuthContextProvider from "@context/AuthContextProvider";

// This config is only required for antd and not related to project.
import StyledComponentsRegistry from "@lib/AntdRegistry";
import { ConfigProvider } from "antd";

export const metadata = {
  title: data.title,
  description: data.description,
};

const popins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const RootLayout = ({ children }) => {
  return (
    <AuthContextProvider>
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
        <body className={`${popins.className}`}>
          <main className="main">
            <StyledComponentsRegistry>
              <ConfigProvider>{children}</ConfigProvider>
            </StyledComponentsRegistry>
          </main>
        </body>
      </html>
    </AuthContextProvider>
  );
};

export default RootLayout;
