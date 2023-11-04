import ClientProductPage from "@components/ClientProductPage";
import data from "@public/assets/data.json";

// This is to force dynamic SSR during run time only and not build time
// This also disables data caching on server. i.e., they perform the same function as cache: "no-store" or next: { revalidate: 0 }
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  // const products = await fetchProductsInfo();
  return {
    // description: products.info,
    alternates: {
      canonical: "/products"
    }
  }
}

async function fetchProducts() {
  const response = await fetch(`${process.env.DOMAIN}/api/products`);
  if (!response.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ClientProductPage products={products.info} />;
}
