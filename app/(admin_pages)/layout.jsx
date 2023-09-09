// This config is only required for antd and not related to project.
import { ConfigProvider } from "antd";
import theme from "@theme/themeConfig";

const AdminSideLayout = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <section>{children}</section>
    </ConfigProvider>
  );
};

export default AdminSideLayout;
