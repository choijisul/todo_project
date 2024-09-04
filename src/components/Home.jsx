import {useState} from "react";
import InputBox from "../components/InputBox"
import TodoItemList from "../components/TodoItemList";

const Home = () => {
    const [todoList, setTodoList] = useState([]);  //todoItem 담을 list (나중에 localstorage)

    return (
        <div className="hompage_container">
            <InputBox todoList={todoList} setTodoList={setTodoList}/>
            {/*진행중 일*/}
            <TodoItemList
                title={'할 일'}
                todoList={todoList}
                setTodoList={setTodoList}
            />
            {/*완료한 일*/}
            {/*<TodoItemList*/}
            {/*    title={'할일'}/>*/}
        </div>
    )
}

export default Home;