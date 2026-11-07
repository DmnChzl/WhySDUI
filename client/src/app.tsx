import { useEffect, useState } from 'preact/hooks';
import { renderNode } from './render';
import { fetchScreen, updatePreferences } from './services/prefService';
import type { UIScreen } from './types/schema';
import { canRender } from './utils';

const USER_ID = 'a1b2c3d4';

export function App() {
  const [screen, setScreen] = useState<UIScreen | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScreen(USER_ID)
      .then(setScreen)
      .catch((err) => setError((err as Error).message));
  }, []);

  const handleAction = async (actionName: string, payload: Record<string, boolean>) => {
    if (!screen) return;

    const action = screen.actions[actionName];
    if (!action) {
      // eslint-disable-next-line no-console
      console.warn(`Unknown Action: ${actionName}`);
      return;
    }

    setError(null);

    try {
      setScreen(await updatePreferences(action, payload));
    } catch (err) {
      setError('Change Not Saved. Please Try Again.');
    }
  };

  if (!screen) {
    return error ? (
      <p class="text-danger" role="alert">
        {error}
      </p>
    ) : (
      <p>Loading...</p>
    );
  }

  if (!canRender(screen)) {
    return (
      <p class="text-danger" role="alert">
        Updated Required!
      </p>
    );
  }

  return (
    <main>
      {error && (
        <p class="text-danger" role="alert">
          {error}
        </p>
      )}

      {renderNode(screen.ui, {
        data: screen.data,
        onAction: handleAction,
      })}
    </main>
  );
}
