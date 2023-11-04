export default async function postAdminSignup(formData) {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await response.json();

  if (response.status === 500) {
    throw new Error("Failed to create admin");
  }
  return data;
}
