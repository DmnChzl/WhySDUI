import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import pc from 'picocolors';
import pckg from '../package.json';
import { prefRoutes } from './preferences/routes';

const now = performance.now();

const app = new Hono();

app.route('/api/preferences', prefRoutes);

serve({ fetch: app.fetch, port: 3000 }, ({ port }) => {
  const diff = Math.round(performance.now() - now);

  console.log('');
  console.log(
    `  ${pc.red(pc.bold('HONO'))} ${pc.red(`v${pckg.dependencies.hono}`)}  ${pc.dim('ready in')} ${pc.bold(`${diff} ms`)}`
  );

  console.log('');
  console.log(`  ${pc.red('➜')}  ${pc.bold('Local:')}  ${pc.cyan(`http://localhost:${port}/`)}`);

  console.log('');
});
