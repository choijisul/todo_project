import {useEffect} from "react";
import InputBox from "../components/InputBox";
import TodoItemList from "../components/TodoItemList";
import {format} from "date-fns";
import '../styles/Todo.css';
import localStorageHelper from "../utils/localStorageHelper"; // 유틸 클래스 임포트

const Todo = ({selectedDate, todoMap, setTodoMap}) => {
    if (selectedDate === null) {  // 선택한 날짜 없으면 빈 화면
        return (
            <div></div>
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

    const setTodoList = (nextTodoList) => {
        setTodoMap((prev) => {
            const newMap = {...prev};
            newMap[dateString] = nextTodoList;
            return newMap;
        });
    };

    // todoMap 변경 감지 후 자동 저장
    useEffect(() => {
        if (todoMap) {
            localStorageHelper.saveTodoMap(todoMap);
        }
    }, [todoMap]);

    return (
        <div className="hompage_container">
            <InputBox onAddClick={onAddClick} />
            {/* 진행중 일 */}
            <TodoItemList
                todoList={todoList}
                dateString={dateString}
                setTodoList={setTodoList}
                checkedList={false}
            />
            {/* 완료한 일 */}
            <TodoItemList
                todoList={todoList}
                dateString={dateString}
                setTodoList={setTodoList}
                checkedList={true}
            />
        </div>
    );
};

export default Todo;
