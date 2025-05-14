import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './components/App.jsx'

// main simply renders the App
createRoot(document.getElementById('root')).render(
    <App />
)