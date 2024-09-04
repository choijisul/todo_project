import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'

let todoList = window.localStorage.getItem("todoList");
if (todoList === null) {
    window.localStorage.setItem("todoList", "[]");
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
