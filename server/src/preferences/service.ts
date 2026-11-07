import type { UIScreen } from '../types/schema';
import {
  findUserById,
  PREFERENCES_KEYS,
  savePreferences,
  type PreferenceKey,
  type Preferences,
  type User,
} from './store';

const UPDATE_PREFERENCE_ACTION = 'updatePreferences';

const toPrefScreen = (user: User): UIScreen => ({
  version: 1,
  screen: 'preferences',
  data: { ...user.preferences },
  ui: {
    type: 'stack',
    children: [
      {
        type: 'section',
        props: { title: 'User Preferences' },
        children: [
          {
            type: 'text',
            props: {
              value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              style: 'muted',
            },
          },
          {
            type: 'switch',
            props: {
              label: 'Enable Dark Mode',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              valuePath: 'darkMode',
              onChange: UPDATE_PREFERENCE_ACTION,
            },
          },
          {
            type: 'switch',
            props: {
              label: 'Enable Email Notifications',
              valuePath: 'emailNotifications',
              onChange: UPDATE_PREFERENCE_ACTION,
            },
          },
          {
            type: 'text',
            props: {
              value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              style: 'muted',
            },
          },
          {
            type: 'switch',
            props: {
              label: 'Enable Push Notifications',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              valuePath: 'pushNotification',
              onChange: UPDATE_PREFERENCE_ACTION,
              disabled: true,
            },
          },
        ],
      },
    ],
  },
  actions: {
    [UPDATE_PREFERENCE_ACTION]: {
      method: 'PATCH',
      href: `/api/preferences/${user.id}`,
    },
  },
});

export const getPreferencesScreen = (userId: string): UIScreen | undefined => {
  const user = findUserById(userId);
  return user && toPrefScreen(user);
};

const isPreferencesPayload = (payload: unknown): payload is Partial<Preferences> => {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return false;
  }

  const entries = Object.entries(payload);

  const hasPreferencesEntries = entries.every(([key, value]) => {
    return (PREFERENCES_KEYS as readonly string[]).includes(key) && typeof value === 'boolean';
  });

  return entries.length > 0 && hasPreferencesEntries;
};

type SetPreferencesResult = { ok: true; screen: UIScreen } | { ok: false; reason: 'bad-request' | 'user-not-found' };

export const setPreferences = (userId: string, payload: unknown): SetPreferencesResult => {
  if (!isPreferencesPayload(payload)) {
    return { ok: false, reason: 'bad-request' };
  }

  const user = savePreferences(userId, payload);
  if (!user) return { ok: false, reason: 'user-not-found' };

  return { ok: true, screen: toPrefScreen(user) };
};
