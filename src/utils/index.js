// fetching data from server
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result.data;
    }
  } catch (error) {}
};

export const postData = async (url, data) => {
  try {
    // data as FormData
    const formData = objToFormData(data);

    // fetch request options
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };

    // fetch request
    const request = await fetch(url, requestOptions);
    const response = await request;
    return response;
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

// transforming first letter of word to uppercase
export const firstLetterToUppercase = (str) => {
  str = str.split('');
  str[0] = str[0].toUpperCase();
  return str.join('');
};

// checking if JSON object is valid
export const isJsonString = (str) => {
  try {
    const res = JSON.parse(str);
    if (typeof res === 'number' || res === null) return false;
  } catch (e) {
    return false;
  }
  return true;
};

// initialising localStorage data
export const initialiseLocalStorage = (values, setValues) => {
  for (let key in values) {
    const value = values[key];

    // skip laptop image
    if (
      key === 'laptopImg' ||
      key === 'laptopImg' ||
      key === 'laptopImgName' ||
      key === 'laptopImgSize'
    )
      continue;

    if (localStorage.getItem(key)) {
      // get value from localStorage if it exists
      const localStorageValue = localStorage.getItem(key);

      if (isJsonString(localStorageValue)) {
        setValues[`set${firstLetterToUppercase(key)}`](
          JSON.parse(localStorageValue)
        );
      } else {
        setValues[`set${firstLetterToUppercase(key)}`](localStorageValue);
      }
    } else {
      // set value to localStorage if it doesn't exist
      if (typeof value === 'object' && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    }
  }
};
