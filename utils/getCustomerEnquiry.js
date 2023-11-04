export default async function getCustomerEnquiry(accessToken) {
  const response = await fetch("/api/enquiry", {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${accessToken}` // this doesnt work
      Authorization: accessToken, // send accesstoken from session as header
    },
  });

  if (response.status === 500) {
    throw new Error("Failed to get data");
  }
  return response;
}
