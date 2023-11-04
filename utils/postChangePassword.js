export default async function postChangePassword(accessToken, formData) {
  const response = await fetch(`/api/changepassword`, {
    method: "POST",
    headers: {
      // Authorization: `Bearer ${accessToken}` // this doesnt work
      Authorization: accessToken, // send accesstoken from session as header
    },
    body: JSON.stringify(formData),
  });
  if (response.status === 500) {
    throw new Error("Failed to update password. Please try again");
  }
  return response;
}
