export default async function postAddProducts(accessToken, formData) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${accessToken}` // this doesnt work
      Authorization: accessToken, // send accesstoken from session as header
    },
    body: JSON.stringify(formData),
  });
  if (response.status === 500) {
    throw new Error("Failed to add products");
  }
  return response;
}
