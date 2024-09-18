import {Calendar} from './components/Calendar.jsx';
import Todo from './components/Todo.jsx'
import Diary from "./components/Diary.jsx";
import DiaryCp from "./components/DiaryCp.jsx";
import './App.css'
import {useState} from "react";

function App() {
    const [selectedDate, setSelectedDate] = useState(null);  //calendar -> todo
    let todoMapJson = window.localStorage.getItem("todoMap");
    const [todoMap, setTodoMap] = useState(JSON.parse(todoMapJson));

    const onSelectedDateChange = (day) => {  //calendar 바뀐 날짜 받기 위함.
        setSelectedDate(day);
    };
    return (
        <div className='app'>
            <div className="calendar">
                <DiaryCp selectedDate={selectedDate}/>
                <Calendar onSelectedDateChange={onSelectedDateChange} todoMap={todoMap}/>
            </div>
            <div className="todo">
                <Todo selectedDate={selectedDate} todoMap={todoMap} setTodoMap={setTodoMap}/>
            </div>
        </div>
    )
}

export default App

