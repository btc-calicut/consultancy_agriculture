import AdminNavBar from "@components/AdminNavBar";

export const metadata = {
  robots: {
    index: false,
    nocache:true
  },
};

const AdminLayout = ({ children }) => {
  return (
    <section>
      <AdminNavBar />
      {children}
    </section>
  );
};

export default AdminLayout;
