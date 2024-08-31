import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import store from './components/cart/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
   <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
  </Provider>
)
