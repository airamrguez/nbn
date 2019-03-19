import { fetchJSON } from './utils';

export function login(user) {
  return fetchJSON('/login', { method: 'POST', body: JSON.stringify(user) });
}

// To make this work with json-server an specific
// route handler has to be added.
export function saveActions(actions) {
  return fetchJSON('/actions', {
    method: 'POST',
    body: JSON.stringify({ data: actions }),
  });
}

// In a real API there should be a more consistent
// way of ordering results. In this example ids are
// generated using dates, so we will relay on this.
export function fetchActions() {
  return fetchJSON('/actions?_sort=id&_order=asc');
}
