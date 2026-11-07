import type { ScreenAction, UIScreen } from '../types/schema';

export const fetchScreen = async (userId: string): Promise<UIScreen> => {
  const response = await fetch(`/api/preferences/${userId}`);
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(json?.error ?? 'Unable To Fetch Screen');
  }
  return json as UIScreen;
};

export const updatePreferences = async (action: ScreenAction, payload: Record<string, boolean>): Promise<UIScreen> => {
  const response = await fetch(action.href, {
    headers: { 'Content-Type': 'application/json' },
    method: action.method,
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(json?.error ?? 'Unable To Update Pref.');
  }
  return json as UIScreen;
};
