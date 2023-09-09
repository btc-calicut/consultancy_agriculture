import { Spin } from "antd";

const HomeLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <Spin size="large" />
    </div>
  );
};

export default HomeLoading;
