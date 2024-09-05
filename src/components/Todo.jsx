import {useState} from "react";
import InputBox from "../components/InputBox"
import TodoItemList from "../components/TodoItemList";
import {format} from "date-fns";

const Todo = ({selectedDate}) => {
    let todoListJson = window.localStorage.getItem("todoList");  //localstorage
    const [todoList, setTodoList] = useState(JSON.parse(todoListJson));
    // console.log(JSON.parse(todoListJson));
    if(selectedDate === null){  //선택한 날짜 없으면 안그림.
        return (
            <div></div>
        )
    }
    const dateString = format(selectedDate, 'yyyyMMdd');
    const onAddClick = (inputData) => {
        // console.log(inputData.text);
        const nextTodoList = todoList.concat({
            id: todoList.length,
            day: dateString,
            text : inputData.text,
            memo : '',  //나중에 받음
            checked: false,
            deleted: false,
        });
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
    }

    // const result = words.filter((word) => word.length > 6);
    console.log(format(selectedDate, 'yyyymmdd'));
    const filterd = todoList.filter((todo) => dateString === todo.day);

    return (
        <div className="hompage_container">
            <InputBox onAddClick={onAddClick}/>
            {/*진행중 일*/}
            <TodoItemList
                todoList={todoList}
                dateString={dateString}
                setTodoList={setTodoList}
                checkedList={false}  //체크 안된
            />
            {/*완료한 일*/}
            <TodoItemList
                todoList={todoList}
                dateString={dateString}
                setTodoList={setTodoList}
                checkedList={true}  //체크 완료
            />
        </div>
    )
}

export default Todo;