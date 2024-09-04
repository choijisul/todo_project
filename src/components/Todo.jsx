import {useState} from "react";
import InputBox from "../components/InputBox"
import TodoItemList from "../components/TodoItemList";
import {format} from "date-fns";

const Todo = ({selectedDate}) => {
    const [todoList, setTodoList] = useState([]);  //todoItem 담을 list (나중에 localstorage)
    if(selectedDate === null){
        return (
            <div></div>
        )
    }
    // let day = format(selectedDate, 'd');
    console.log(selectedDate);
    return (
        <div className="hompage_container">
            {/*<div>{day}</div>*/}
            <InputBox todoList={todoList} setTodoList={setTodoList}/>
            {/*진행중 일*/}
            <TodoItemList
                todoList={todoList}
                setTodoList={setTodoList}
                checkedList={false}  //체크 안된
            />
            {/*완료한 일*/}
            <TodoItemList
                todoList={todoList}
                setTodoList={setTodoList}
                checkedList={true}  //체크 완료
            />
        </div>
    )
}

export default Todo;