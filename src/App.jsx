import {Calendar} from './components/Calendar.jsx';
import Todo from './components/Todo.jsx'
import Diary from "./components/Diary.jsx";
import DiaryCp from "./components/DiaryCp.jsx";
import './App.css'
import {useState} from "react";

function App() {
    const [selectedDate, setSelectedDate] = useState(undefined);  //undefined 에러 발생..
    // console.log(selectedDate);
    let todoMapJson = window.localStorage.getItem("todoMap");
    const [todoMap, setTodoMap] = useState(JSON.parse(todoMapJson));

    const onSelectedDateChange = (date) => {  //calendar 바뀐 날짜 받기 위함.
        setSelectedDate(date);
    };
    return (
        <div className='app'>
            <div className="calendar">
                <Diary selectedDate={selectedDate}/>
                <Calendar onSelectedDateChange={onSelectedDateChange} todoMap={todoMap}/>
            </div>
            <div className="todo">
                <Todo selectedDate={selectedDate} todoMap={todoMap} setTodoMap={setTodoMap}/>
            </div>
        </div>
    )
}

export default App

