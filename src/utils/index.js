// fetching data from server
export const fetchData = async (url) => {
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

// call the same function on enter as when clicking on button
export const triggerOnEnter = (e) => {
  e.preventDefault();
  e.target.click();
};

// transforms object to FormData for sending data
export const objToFormData = (obj) => {
  return Object.entries(obj).reduce(
    (d, e) => (d.append(...e), d),
    new FormData()
  );
};
