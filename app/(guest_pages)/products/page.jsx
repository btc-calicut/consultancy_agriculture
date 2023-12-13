// This is to force dynamic SSR during run time, avoiding static SSR at build time
// This also disables data caching on server. i.e., they perform the same function as cache: "no-store" or next: { revalidate: 0 }
export const dynamic = "force-dynamic";

import getProducts from "@utils/getProducts";
import ClientProductPage from "@components/ClientProductPage";

export async function generateMetadata() {
  const products = await getProducts();
  const productNames = products.info.map((product) => product.name);
  return {
    description: `Discover our latest selection of products available for trading. We offer ${
      productNames.length > 1
        ? "a diverse range of high-quality items, including"
        : "the high-quality product"
    } ${productNames.join(
      ", "
    )}. Explore our up-to-date inventory and take advantage of the opportunities in the market.`,
    keywords: productNames,
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
