// This is to force dynamic SSR during run time only and not build time
// This also disables data caching on server. i.e., they perform the same function as cache: "no-store" or next: { revalidate: 0 }
export const dynamic = "force-dynamic";

import getProducts from "@utils/getProducts";
import AdminProductPage from "@components/AdminProductPage";

export default async function () {
  // get request to api
  const products = await getProducts();

  return <AdminProductPage products={products.info} />;
}
