import {} from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
import todo from "./Todo.jsx";

const ToDoItemList = ({todoList, dateString, setTodoList, checkedList}) => {
    return (
        <div className="todoapp__list">
            <ul className="todoapp__list-ul">
                {todoList &&
                    todoList.map((todoItem) => {
                        if (todoItem.deleted) return null;

                        if (checkedList !== todoItem.checked) return null;

                        if(dateString !== todoItem.day) return <></>;  //같은 날짜가 아니면 안보이게

                    return (
                        <ToDoItem
                            key={todoItem.id}
                            todoItem={todoItem}
                            onTodoItemChanged={(newTodoItem) => {
                                console.log(".", newTodoItem);
                                const newTodoList = todoList.map((i) => {
                                    return i.id === newTodoItem.id ? newTodoItem : i;
                                });
                                setTodoList(newTodoList);
                            }}
                            onTodoItemDeleted={(deletedId) => {
                                console.log("!", deletedId);
                                const newTodoList = todoList.filter((item) => item.id !== deletedId);
                                setTodoList(newTodoList);
                            }}
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