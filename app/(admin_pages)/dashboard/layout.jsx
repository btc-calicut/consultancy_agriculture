import AdminNavBar from "@components/AdminNavBar";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AdminLayout({ children }) {
  return (
    <section>
      <AdminNavBar />
      {children}
    </section>
  );
}
