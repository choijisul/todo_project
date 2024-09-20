import {useCallback} from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
import {format} from "date-fns";

const ToDoItemList = ({todoList, dateString, setTodoList, checkedList}) => {
    const onTodoItemChanged = useCallback((newTodoItem) => {
        setTodoList(prev => {
            const newTodoList = prev.map((i) =>
                // i.id === newTodoItem.id ? newTodoItem : i
                i.id === newTodoItem.id && i.day === newTodoItem.day ? newTodoItem : i
            );
            return newTodoList;
        });
    }, [dateString]);

    const onTodoItemDeleted = useCallback((deletedId, deletedDay) => {
        setTodoList(prev => {
            // const newTodoList = prev.filter((item) => item.id !== deletedId);
            const newTodoList = prev.filter((item) => item.id !== deletedId || item.day !== deletedDay);
            return newTodoList
        });
    }, [dateString]);


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