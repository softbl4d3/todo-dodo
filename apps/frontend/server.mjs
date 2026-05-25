import { writeFileSync } from 'fs';
import { spawn } from 'child_process';

const apiUrl = process.env.VITE_API_URL || 'http://localhost:3000';
writeFileSync('dist/env-config.js', `window.__RUNTIME_CONFIG__={API_URL:'${apiUrl}'};`);

const server = spawn('npx', ['serve', '-s', 'dist', '-l', process.env.PORT || '3001'], {
  stdio: 'inherit',
});

process.on('SIGTERM', () => server.kill());
process.on('SIGINT', () => server.kill());
