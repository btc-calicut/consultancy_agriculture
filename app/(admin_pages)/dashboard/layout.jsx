import AdminNavBar from "@components/AdminNavBar";

export const metadata = {
  robots: {
    index: false,
    nocache: true,
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
