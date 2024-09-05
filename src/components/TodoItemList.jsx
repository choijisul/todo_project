import {} from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoItemList = ({todoList, dateString, setTodoList, checkedList}) => {
    return (
        <div className="todoapp__list">
            <ul className="todoapp__list-ul">
                {todoList &&
                    todoList.map((todoItem) => {
                        if (todoItem.deleted) return null;

                        if (checkedList !== todoItem.checked) return null;

                        if(dateString !== todoItem.day) return null;  //삭제된거 안 보이게만.

                    return (
                        <ToDoItem
                            key={todoItem.id}
                            todoItem={todoItem}
                            todoList={todoList}
                            setTodoList={setTodoList}
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