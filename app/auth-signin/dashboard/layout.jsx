import Header from "@components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default DashboardLayout;
