import AdminNavBar from "@components/AdminNavBar";

const AdminLayout = ({ children }) => {
  return (
    <section>
      <AdminNavBar />
      {children}
    </section>
  );
};

export default AdminLayout;
