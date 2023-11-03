import ClientProductPage from "@components/ClientProductPage";

// This is to force dynamic SSR during run time only and not build time
// This also disables data caching on server. i.e., they perform the same function as cache: "no-store" or next: { revalidate: 0 }
export const dynamic = "force-dynamic";

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
