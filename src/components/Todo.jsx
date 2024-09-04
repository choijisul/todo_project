import {useState} from "react";
import InputBox from "../components/InputBox"
import TodoItemList from "../components/TodoItemList";

const Todo = () => {
    const [todoList, setTodoList] = useState([]);  //todoItem 담을 list (나중에 localstorage)

    return (
        <div className="hompage_container">
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