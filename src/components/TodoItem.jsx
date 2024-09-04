import {useState, useRef, useEffect} from 'react';
import * as PropTypes from "prop-types";

const ToDoItem = ({todoItem, todoList, setTodoList}) => {
    const [edited, setEdited] = useState(false);
    const [newText, setNewText] = useState(todoItem.text);  //새로운 item 내용
    const editInputRef = useRef(null);

    useEffect(() => {
        if (edited) {
            editInputRef.current.focus();
        }
    }, [edited]);

    const onChangeCheckbox = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            checked: item.id === todoItem.id ? !item.checked : item.checked,
        }));
        setTodoList(nextTodoList);
    }

    // 삭제
    const onClickDeleteButton = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            deleted: item.id === todoItem.id ? true : item.deleted,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
    };

    // 수정
    const onClickEditButton = () => {
        setEdited(true);
    };

    const onChangeEditInput = (e) => {
        setNewText(e.target.value);
    };

    const onClickSubmitButton = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            text: item.id === todoItem.id ? newText : item.text,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
        setEdited(false);
    }

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
            {
                edited ? (
                    <input
                        type="text"
                        value={newText}
                        ref={editInputRef}
                        onChange={onChangeEditInput}
                    />
                ) : (
                    <span className={`todoapp__item-ctx ${
                        todoItem.checked ? 'todoapp__item-ctx-checked' : ''
                    }`}
                    >{
                        todoItem.text}
                </span>
                )
            }
            {/* 수정 버튼 */}
            {
                !todoItem.checked ? ( //완료한 경우 안보이게
                    edited ? (
                        <button
                            type="button"
                            className="todoapp_item-edit-btn"
                            onClick={onClickSubmitButton}
                        >
                            ok
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="todoapp__item-edit-btn"
                            onClick={onClickEditButton}
                        >
                            수정
                        </button>  //나중에는 list 누르면 버튼이 나오게
                    )
                ) : null
            }
            {/* 삭제 버튼 */}
            <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={onClickDeleteButton}
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