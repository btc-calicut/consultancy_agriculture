import AdminProductPage from "@components/AdminProductPage";

// This is to force dynamic SSR during run time only. Not build time
export const dynamic = "force-dynamic";

async function fetchProducts() {
  const response = await fetch(`${process.env.DOMAIN}api/products`);
  if (!response.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export default async function () {
  const products = await fetchProducts();
  return <AdminProductPage products={products.info} />;
}
