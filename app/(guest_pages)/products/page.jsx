// This is to force dynamic SSR during run time, avoiding static SSR at build time
// This also disables data caching on server. i.e., they perform the same function as cache: "no-store" or next: { revalidate: 0 }
export const dynamic = "force-dynamic";

import getProducts from "@utils/getProducts";
import ClientProductPage from "@components/ClientProductPage";

export async function generateMetadata() {
  // const products = await fetchProductsInfo();
  return {
    // description: products.info,
    alternates: {
      canonical: "/products",
    },
  };
}

export default async function ProductsPage() {
  // get request to api
  const products = await getProducts();

  return <ClientProductPage products={products.info} />;
}
