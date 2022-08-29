export const fetchOptions = async (url) => {
  const request = await fetch(url);
  const response = await request.json();
  return response.data;
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
