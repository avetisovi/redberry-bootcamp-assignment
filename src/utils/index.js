export const fetchOptions = async (url) => {
  const request = await fetch(url);
  const response = await request.json();
  return response.data;
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const triggerOnEnter = (e) => {
  e.preventDefault();
  e.target.click();
};

export const blobToUint8Array = (b) => {
  const uri = URL.createObjectURL(b);
  const xhr = new XMLHttpRequest();
  let i;
  let ui8;

  xhr.open('GET', uri, false);
  xhr.send();

  URL.revokeObjectURL(uri);

  ui8 = new Uint8Array(xhr.response.length);

  for (i = 0; i < xhr.response.length; ++i) {
    ui8[i] = xhr.response.charCodeAt(i);
  }

  return ui8;
};
