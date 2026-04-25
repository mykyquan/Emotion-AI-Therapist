const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const apiUrl = path => `${API_BASE_URL}${path}`;

export async function requestJson(path, options = {}) {
  const response = await fetch(apiUrl(path), options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok && data.reply == null) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }

  return data;
}
