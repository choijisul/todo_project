// import {useState} from "react";
import InputBox from "../components/InputBox"
import TodoItemList from "../components/TodoItemList";
import {format} from "date-fns";
import '../styles/Todo.css'
import localStorageHelper from "../utils/localStorageHelper";
import {useEffect} from "react";

const Todo = ({selectedDate, todoMap, setTodoMap}) => {
    if (!selectedDate) {  //선택한 날짜 없으면 안그림.
        return (
            <></>
        )
    }

    const dateString = format(selectedDate, 'yyyyMMdd');
    let todoList = todoMap[dateString];

    if (todoList === undefined) {
        todoList = [];
    }

    const onAddClick = (inputData) => {
        setTodoList(prevItems => {
            const nextTodoList = prevItems.concat({
                id: todoList.length,
                day: dateString,
                text: inputData.text,
                memo: '',
                checked: false,
                deleted: false,
            });
            return nextTodoList;
        });
    };

    const setTodoList = (mapper) => {
        setTodoMap((prevItems) => {
            const newMap = {...prevItems};
            let nextTodoList = mapper(newMap[dateString] || []);
            newMap[dateString] = nextTodoList;
            return newMap;
        })
    }

    useEffect(() => {
        if (todoMap) {
            localStorageHelper.saveTodoMap(todoMap);
        }
    }, [todoMap]);

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