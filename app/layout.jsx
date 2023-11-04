import { Poppins } from "next/font/google";
import "@styles/globals.css";
import data from "@public/assets/data.json";
import AuthContextProvider from "@config/AuthContextProvider";

// This config is only required for antd and not related to project.
import StyledComponentsRegistry from "@lib/AntdRegistry";
import { ConfigProvider } from "antd";

export const metadata = {
  title: data.title,
  description: data.description,
  keywords: ['BTC','Blueway Trading Company','Blueway','Trading','Agri products'],
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL("https://bluewaytradingcompany.vercel.app"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: data.title,
    description: data.description,
    url: 'https://bluewaytradingcompany.vercel.app',
    siteName: 'Blueway Trading Company',
    images: [
      {
        url: '/images/pict1.jpg',
        width: 800,
        height: 600,
      },
      
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  category: 'technology',
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
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
