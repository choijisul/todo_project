// import {useState} from "react";
import InputBox from "../components/InputBox"
import TodoItemList from "../components/TodoItemList";
import {format} from "date-fns";
import '../styles/Todo.css'

const Todo = ({selectedDate, todoMap, setTodoMap}) => {
    if(selectedDate === null){  //선택한 날짜 없으면 안그림.
        return (
            <div></div>
        )
    }

    const dateString = format(selectedDate, 'yyyyMMdd');
    let todoList = todoMap[dateString];

    if(todoList === undefined){
        todoList = [];
    }

    const onAddClick = (inputData) => {
        const nextTodoList = todoList.concat({
            id: todoList.length,
            day: dateString,
            text : inputData.text,
            memo : '',
            checked: false,
            deleted: false,
        });
        setTodoMap((prev) => {
            const newMap = {...prev};
            newMap[dateString] = nextTodoList;
            window.localStorage.setItem("todoMap", JSON.stringify(newMap));
            return newMap;
        });
    }

    const setTodoList = (nextTodoList) => {
        setTodoMap((prev) => {
            const newMap = {...prev};
            newMap[dateString] = nextTodoList;
            window.localStorage.setItem("todoMap", JSON.stringify(newMap));
            return newMap;
        });
    }

    return (
        <div className="hompage_container">
            <InputBox onAddClick={onAddClick}/>
            {/*진행중 일*/}
            <TodoItemList
                todoList={todoList}
                dateString={dateString}
                setTodoList={setTodoList}
                checkedList={false}
            />
            {/*완료한 일*/}
            <TodoItemList
                todoList={todoList}
                dateString={dateString}
                setTodoList={setTodoList}
                checkedList={true}
            />
        </div>
    )
}

export default Todo;