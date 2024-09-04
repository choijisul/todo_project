import {} from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoItemList = ({ title, todoList, setTodoList }) => (
    <div className="todoapp__list">
        {/* props로 부터 title 값을 전달 받음 */}
        <p className="todoapp__list-tit">{title}</p>

        <ul className="todoapp__list-ul">
            {todoList && todoList.map((todoItem) => (
                <ToDoItem
                    key={todoItem.id}
                    todoItem={todoItem}
                    todoList={todoList}
                    setTodoList={setTodoList}
                />
            ))}
        </ul>
    </div>
);

ToDoItemList.propTypes = {
    title: PropTypes.string.isRequired,
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
};

export default ToDoItemList;