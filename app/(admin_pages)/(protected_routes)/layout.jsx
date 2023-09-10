import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route.js";
import { redirect } from "next/navigation";

const AdminProtectedLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth-signin");
  }
  return children;
};

export default AdminProtectedLayout;
