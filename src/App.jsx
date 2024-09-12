import {Calendar} from './components/Calendar.jsx';
import Todo from './components/Todo.jsx'
import Diary from "./components/Diary.jsx";
import './App.css'
import {useState} from "react";

function App() {
    const [selectedDate, setSelectedDate] = useState(null);  //calendar -> todo
    const onSelectedDateChange = (day) => {  //calendar 바뀐 날짜 받기 위함.
        setSelectedDate(day);
    };
    return (
        <div className='app'>
            <div className="calendar">
                <Diary selectedDate={selectedDate}/>
                <Calendar onSelectedDateChange={onSelectedDateChange}/>
            </div>
            <div className="todo">
                <Todo selectedDate={selectedDate}/>
            </div>
        </div>
    )
}

export default App

