export const fetchOptions = async (url) => {
  try {
    const request = await fetch(url);
    const response = await request.json();
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const triggerOnEnter = (e) => {
  e.preventDefault();
  e.target.click();
};

export const objToFormData = (obj) => {
  return Object.entries(obj).reduce(
    (d, e) => (d.append(...e), d),
    new FormData()
  );
};

export const blobToBinaryString = async (blob) => {
  const reader = new FileReader();
  reader.readAsBinaryString(blob);

  while (reader.readyState !== 2) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return reader.result;
};
