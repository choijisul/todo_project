import {useState, useRef, useEffect} from 'react';
import * as PropTypes from "prop-types";
import '../styles/Todo.css';

const ToDoItem = ({todoItem, todoList, setTodoList, onAddClick}) => {
    const [edited, setEdited] = useState(false);  //수정
    const [newText, setNewText] = useState(todoItem.text);  //
    const [memo, setMemo] = useState(todoItem.memo || ''); // memo 초기값 설정
    const [modalVisible1, setModalVisible1] = useState(false);  //삭제, 수정, 메모 버튼 모달
    const [modalVisible2, setModalVisible2] = useState(false);  //메모 작성 모달

    const editInputRef = useRef(null);

    useEffect(() => {
        if (edited) {
            editInputRef.current.focus();
        }
    }, [edited]);

    // 체크박스 상태
    const onChangeCheckbox = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            checked: item.id === todoItem.id ? !item.checked : item.checked,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
    };

    // list 삭제
    const onClickDeleteButton = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            deleted: item.id === todoItem.id ? true : item.deleted,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
        setModalVisible1(false);
    };

    // 수정
    const onClickEditButton = () => {
        setEdited(true); // 제목 수정 모드
        setModalVisible1(false); // 모달 닫기
    };

    // 메모
    const onClickMemoButton = () => {
        setModalVisible1(false);
        setModalVisible2(true);
    }

    const memoInput = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            memo: item.id === todoItem.id ? memo : item.memo,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList)); // 메모 저장
        setModalVisible1(false); // 메모 저장 후 모달 닫기
    };

    // 제목 수정
    const onClickSubmitButton = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            text: item.id === todoItem.id ? newText : item.text,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
        setEdited(false); // 수정 완료 후 수정 모드 해제
    };

    const onChangeMemoInput = (e) => {
        setMemo(e.target.value); // 메모 입력값을 상태로 저장
    };

    const onClickTitle = () => {
        setModalVisible1(true);
    };

    const closeModal1 = () => {
        setModalVisible1(false);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
    };

    return (
        <div>
            <li className="todoapp__item">
                {/* checkbox */}
                <input
                    type="checkbox"
                    className="todoapp__item-checkbox"
                    checked={todoItem.checked}
                    onChange={onChangeCheckbox}
                />
                {/* 제목 수정 모드에 따른 input 처리 */}
                {edited ? (
                    <input
                        type="text"
                        value={newText}
                        ref={editInputRef}
                        onChange={onChangeEditInput}
                        onBlur={onClickSubmitButton} // 입력이 완료되면 저장
                    />
                ) : (
                    <span
                        className={`todoapp__item-ctx ${
                            todoItem.checked ? 'todoapp__item-ctx-checked' : ''
                        }`}
                        onClick={onClickTitle} // 제목 클릭 이벤트
                    >
                    {todoItem.text}
                </span>
                )}

                {/* 모달(삭제, 수정, 메모 버튼) */}
                {modalVisible1 && (
                    <div className="modal">
                        <div className="modal-content">
                            {/* 수정 버튼 */}
                            <div className="modal-content-head">
                                {newText}
                                <button type="button" onClick={closeModal1}>닫기</button>
                            </div>
                            {
                                !todoItem.checked && (
                                    <button
                                        type="button"
                                        className="todoapp__item-edit-btn"
                                        onClick={onClickEditButton}
                                    >
                                        수정
                                    </button>
                                )
                            }
                            {/* 삭제 버튼 */}
                            <button
                                type="button"
                                className="todoapp__item-delete-btn"
                                onClick={onClickDeleteButton}
                            >
                                삭제
                            </button>
                            <div className="modal-memo">
                                {/* 메모 입력 */}
                                <button
                                    type="button"
                                    className="todoapp__item-memo-btn"
                                    onClick={onClickMemoButton}
                                >
                                    메모
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/*메모 작성 모달*/}
                {modalVisible2 && (
                    <div className="modal2">
                        <div className="modal-content2">
                            <div className="modal-content-header2">
                                {newText}
                                <button type="button" onClick={closeModal2}>
                                    닫기
                                </button>
                            </div>
                            <textarea
                                type="text"
                                value={memo} // 메모 상태값을 사용
                                className="todoapp__item-memo-textarea"
                                onChange={onChangeMemoInput} // 입력 시 상태값 변경
                                onBlur={memoInput} // 포커스 해제 시 저장
                            />
                        </div>
                    </div>
                )}
            </li>
            {/*<button*/}
            {/*    type="button"*/}
            {/*>ㅇ</button>  /!*메모 존재 여부*!/*/}
        </div>
    );
};

ToDoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        memo: PropTypes.string, // memo 프로퍼티 추가
    }),
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
            memo: PropTypes.string, // memo 프로퍼티 추가
        })
    ),
    setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;
