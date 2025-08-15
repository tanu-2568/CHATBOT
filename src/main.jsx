import React from 'react';
import ReactDOM from 'react-dom/client';
import { NhostClient, NhostProvider } from '@nhost/react';
import App from './App.jsx';
import './index.css';

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <App />
    </NhostProvider>
  </React.StrictMode>
);