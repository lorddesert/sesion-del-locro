import { StrictMode } from 'react'
import App from './components/App/App.jsx'
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<StrictMode>
  <App />
</StrictMode>);