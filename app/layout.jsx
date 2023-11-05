import { Poppins } from "next/font/google";
import "@styles/globals.css";
import data from "@public/assets/data.json";
import AuthContextProvider from "@lib/AuthContextProvider";

// This config is only required for antd and not related to project.
import StyledComponentsRegistry from "@lib/AntdRegistry";
import { ConfigProvider } from "antd";

export const metadata = {
  // inorder for the "title.template" to work, the pages in that specific route must also have a "title" in its metadata.
  // if the pages in that specific route have no "title", then "title.default" of the closest parent Layout will be shown for that particular page
  title: { default: data.title, template: "%s | BTC" },
  description: data.description,
  keywords: [
    "BTC",
    "Blueway Trading Company",
    "Blueway",
    "Trading",
    "Agriproducts",
    "btc calicut",
  ],
  generator: "Next.js",
  applicationName: "Blueway Trading Company",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Aswin" }, { name: "Edwin" }, { name: "Arun" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(`${process.env.DOMAIN}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${process.env.DOMAIN}`,
    siteName: "Blueway Trading Company",
    images: [
      {
        url: "/images/logo-background.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo-background.jpg",
    apple: "/images/logo-background.jpg",
  },
  category: "technology",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const popins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
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
}
