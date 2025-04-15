import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/auth.jsx';
import { CartProvider } from '../context/cart.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>

    </AuthProvider>


    <Toaster />
  </StrictMode>,
)
