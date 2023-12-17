export default async function postNewsletter(email) {
  const newsLetterData = {
    email: email,
  };
  const response = await fetch(`api/newsletter`, {
    method: "POST",
    body: JSON.stringify(newsLetterData),
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error("Failed to subscribe");
  }
  return data;
}
