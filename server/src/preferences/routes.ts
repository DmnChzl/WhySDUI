import { Hono } from 'hono';
import { getPreferencesScreen, setPreferences } from './service';

export const prefRoutes = new Hono();

prefRoutes.get('/:userId', (ctx) => {
  const userId = ctx.req.param('userId');
  const screen = getPreferencesScreen(userId);

  if (!screen) {
    return ctx.json({ message: 'user-not-found' }, 404);
  }

  ctx.header('Cache-Control', 'private, no-store');
  return ctx.json(screen);
});

prefRoutes.patch('/:userId', async (ctx) => {
  const userId = ctx.req.param('userId');
  const body = await ctx.req.json().catch(() => null);
  const result = setPreferences(userId, body);

  if (!result.ok) {
    const status = result.reason === 'user-not-found' ? 404 : 400;
    return ctx.json({ message: result.reason }, status);
  }

  return ctx.json(result.screen);
});
