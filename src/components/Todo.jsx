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
        const nextTodoList = todoList.concat({
            id: todoList.length,
            day: dateString,
            text: inputData.text,
            memo: '',
            checked: false,
            deleted: false,
        });
        setTodoList(nextTodoList);
    };

    //TodoItem에서 수정한거 관련 에러 여기서.
    //이 부분 console보면 배열이 아니라서 에러 발생. 예외처리 하면 그냥 빈배열 찍힘.
    const setTodoList = (nextTodoList) => {
        console.log("nextTodoList", nextTodoList);
        setTodoMap((prev) => {
            const newMap = {...prev};
            newMap[dateString] = nextTodoList;
            return newMap;
        });
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