export const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '');
// Requests to the local API are resolved from the site root so MSW can intercept them.
export const API_PREFIX = '';
