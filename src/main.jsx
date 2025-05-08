import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './components/App.jsx'
  /**
  * Challenge: Start a brand new React app!
  * - Create a separate App component
  * - Import and render the App component here
  * - In the App component, render a <main> element
  * - Style everything to look like the slide
  */

createRoot(document.getElementById('root')).render(
    <App />
)