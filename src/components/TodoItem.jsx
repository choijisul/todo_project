import {} from 'react';
import * as PropTypes from "prop-types";

const ToDoItem = ({todoItem, todoList, setTodoList}) => {
    const onChangeCheckbox = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            checked: item.id === todoItem.id ? !item.checked : item.checked,
        }));
        setTodoList(nextTodoList);
    }

    // const onClickDeleteButton = () => {
    //     if (window.confirm('정말 지우나요?')) {
    //         const nextTodoList = todoList.map((item) => ({
    //             ...item,
    //             deleted: item.id === todoItem.id ? true : item.deleted,
    //         }));
    //         setTodoList(nextTodoList);
    //     }
    // };
    return (
        <li className="todoapp__item">
            {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
            <input
                type="checkbox"
                className="todoapp__item-checkbox"
                checked={todoItem.checked}
                onChange={onChangeCheckbox}
            />
            {/* 아이템 내용 */}
            <span className={`todoapp__item-ctx ${
                todoItem.checked ? 'todoapp__item-ctx-checked' : ''
            }`}
            >{
                todoItem.text}
            </span>
            {/* 수정 버튼 */}
            {
                !todoItem.checked ? ( //완료한 경우 안보이게
                    <button type="button" className="todoapp__item-edit-btn">
                        수정
                    </button>  //나중에는 list 누르면 버튼이 나오게
                ) : null
            }
            {/* 삭제 버튼 */}
            <button
                type="button"
                className="todoapp__item-delete-btn"
            > 삭제
            </button>
        </li>
    )
};

ToDoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
    }),
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;