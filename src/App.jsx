import {Calendar} from './components/Calendar.jsx';
import Todo from './components/Todo.jsx'
import './App.css'
import {useState} from "react";

function App() {
    const [selectedDate, setSelectedDate] = useState(null);  //calendar -> todo 위해
    const onSelectedDateChange = (day) => {  //calendar 바뀐 날짜 받기 위함.
        setSelectedDate(day);
    };
    return (
        <div className='app'>
            <Calendar onSelectedDateChange={onSelectedDateChange}/>
            <Todo selectedDate={selectedDate}/>
        </div>
    )
}

export default App

// 캘린더 선택하면 선택한 날짜를 App이 받게
// 선택한 날짜 기준으로 투두에 list 보여주기
// 투두에서 등록할 때 날짜 포함해서 등록, localstorage에, 삭제, 수정, 메모도
// 캘린더에 리스트 남은 갯수 표시
