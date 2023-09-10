import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route.js";
import { redirect } from "next/navigation";

const AdminUnprotectedLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return children;
};

export default AdminUnprotectedLayout;
