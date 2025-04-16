// src/utils/fetchWithTimeout.js
export const fetchWithTimeout = async (url, options, timeout = 5000) => {
 const controller = new AbortController();
 const timeoutId = setTimeout(() => controller.abort(), timeout);
 const response = await fetch(url, { ...options, signal: controller.signal });
 clearTimeout(timeoutId);
 return response;
};
