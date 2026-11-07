export const PREFERENCES_KEYS = ['darkMode', 'emailNotifications', 'pushNotifications'] as const;

export type PreferenceKey = (typeof PREFERENCES_KEYS)[number];
export type Preferences = Record<PreferenceKey, boolean>;

export interface User {
  id: string;
  email: string;
  preferences: Preferences;
}

const users = new Map<string, User>([
  [
    'a1b2c3d4',
    {
      id: 'a1b2c3d4',
      email: 'john.doe@pm.me',
      preferences: {
        darkMode: true,
        emailNotifications: true,
        pushNotifications: true,
      },
    },
  ],
]);

export const findUserById = (id: string): User | undefined => {
  const user = users.get(id);
  return user ?? undefined;
};

export const savePreferences = (id: string, preferences: Partial<Preferences>): User | undefined => {
  const user = users.get(id);
  if (!user) return undefined;

  const updated = {
    ...user,
    preferences: { ...user.preferences, ...preferences },
  };

  users.set(id, updated);
  return updated;
};
