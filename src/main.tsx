import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminApp from './admin/AdminApp.tsx';
import {hydrateCatalog} from './data/catalogStore.ts';
import './index.css';

async function bootstrap() {
  const isAdmin = /^\/admin(\/|$)/.test(window.location.pathname);

  if (!isAdmin) {
    await hydrateCatalog();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {isAdmin ? <AdminApp /> : <App />}
    </StrictMode>,
  );
}

void bootstrap();
