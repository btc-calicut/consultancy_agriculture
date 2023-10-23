import ClientProductPage from "@components/ClientProductPage";

async function fetchProducts() {
  const response = await fetch(`${process.env.DOMAIN}api/products`);
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
