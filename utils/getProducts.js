export default async function getProducts() {
  const response = await fetch(`${process.env.DOMAIN}/api/products`);
  if (response.status !== 200) {
    throw new Error("Failed to get products data");
  }
  const data = await response.json();
  return data;
}
