export const fetchOptions = async (url) => {
  const request = await fetch(url);
  const response = await request.json();
  console.log(response);
  return response.data;
};
