export default async function deleteProducts(accessToken, selectedProductList) {
  const response = await fetch("/api/products", {
    method: "DELETE",
    headers: {
      // Authorization: `Bearer ${accessToken}` // this doesnt work
      Authorization: accessToken, // send accesstoken from session as header
    },
    body: JSON.stringify(selectedProductList),
  });
  if (response.status === 500) {
    throw new Error("Failed to delete");
  }
  return response;
}
