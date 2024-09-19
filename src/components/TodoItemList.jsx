import {useCallback} from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoItemList = ({todoList, dateString, setTodoList, checkedList}) => {
    const onTodoItemChanged = useCallback((newTodoItem) => {
        // console.log(".................", newTodoItem);
        const newTodoList = todoList.map((i) => {
            return i.id === newTodoItem.id ? newTodoItem : i;
        });
        // console.log("@@@@@@@@@@@@",todoList);
        setTodoList(newTodoList);
    }, [todoList, setTodoList]);

    const onTodoItemDeleted = useCallback((deletedId) => {
        // console.log("!", deletedId);
        const newTodoList = todoList.filter((item) => item.id !== deletedId);
        setTodoList(newTodoList);
    }, [todoList, setTodoList]);

    return (
        <div className="todoapp__list">
            <ul className="todoapp__list-ul">
                {todoList &&
                    todoList.map((todoItem, idx) => {
                        if (todoItem.deleted) return null;

                        if (checkedList !== todoItem.checked) return null;

                        if(dateString !== todoItem.day) return <></>;  //같은 날짜가 아니면 안보이게

                    return (
                        <ToDoItem
                            key={idx}
                            todoItem={todoItem}
                            onTodoItemChanged={onTodoItemChanged}
                            onTodoItemDeleted={onTodoItemDeleted}
                        />
                    )
                })}
            </ul>
        </div>
    )
};

ToDoItemList.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
    checkedList: PropTypes.bool.isRequired,
};

export default ToDoItemList;