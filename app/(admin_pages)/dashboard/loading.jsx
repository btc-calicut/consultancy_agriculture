import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <Spin size="large" />
    </div>
  );
}
