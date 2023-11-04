export default async function postEnquiry(copyFormData) {
  const response = await fetch(`/api/enquiry`, {
    method: "POST",
    body: JSON.stringify(copyFormData),
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error("Failed to send enquiry");
  }
  return data;
}
