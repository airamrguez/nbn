import { Platform } from 'react-native';

export function isEmpty(obj) {
  return isNil(obj) || (isFinite(obj.length) && obj.length === 0);
}

export function isNil(obj) {
  return obj == null;
}

export function isString(obj) {
  return typeof obj === 'string';
}

const API_ENDPOINT = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
});

export function fetchJSON(url, options = { method: 'GET' }) {
  return fetch(`${API_ENDPOINT}${url}`, {
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

export function formatTime(time) {
  const minutes = parseInt(time / 60, 10);
  const timeRemaining = time % 60;
  const seconds = String(parseInt(timeRemaining, 10));

  let output = '';
  if (minutes > 0) {
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }
  return `${output}${seconds}`;
}
