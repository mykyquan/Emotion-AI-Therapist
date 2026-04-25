import { requestJson } from './apiClient';

export function fetchAssistantConfig() {
  return requestJson('/api/config');
}

export function fetchHistory() {
  return requestJson('/api/history');
}

export function clearHistory() {
  return requestJson('/api/history', { method: 'DELETE' });
}

export function saveContextEntry({ context, message }) {
  return requestJson('/api/context', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, message }),
  });
}

export function requestAssistantReply({ context, message, lang }) {
  return requestJson('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context, message, lang }),
  });
}
