import { Spin } from "antd";

const ProductLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <Spin size="large" />
    </div>
  );
};

export default ProductLoading;
