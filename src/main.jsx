import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/account/AuthContext.jsx'; // Adjust the path based on your folder structure

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
