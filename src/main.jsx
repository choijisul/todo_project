import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let todoMap = window.localStorage.getItem("todoMap");
if(todoMap === null){
    window.localStorage.setItem("todoMap", "{}");
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
