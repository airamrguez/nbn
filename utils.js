export function isEmpty(obj) {
  return isNil(obj) || (isFinite(obj.length) && obj.length === 0);
}

export function isNil(obj) {
  return obj == null;
}

export function isString(obj) {
  return typeof obj === 'string';
}

export function fetchJSON(url, options = { method: 'GET' }) {
  return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
}

