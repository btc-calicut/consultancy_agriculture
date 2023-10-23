import ClientProductPage from "@components/ClientProductPage";
import { inDevEnvironment } from "@config/ProdDev";

async function fetchProducts() {
  let response = null;
  if (inDevEnvironment) {
    response = await fetch(`http://localhost:3000/api/products`);
  } else {
    response = await fetch(`${process.env.PROD_DOMAIN}/api/products`);
  }
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
