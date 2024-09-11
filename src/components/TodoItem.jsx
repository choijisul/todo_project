import {useState, useRef, useEffect} from 'react';
import * as PropTypes from "prop-types";
import '../styles/Todo.css';

const ToDoItem = ({todoItem, todoList, setTodoList}) => {
    const [edited, setEdited] = useState(false);  //수정
    const [newText, setNewText] = useState(todoItem.text);  //
    const [memo, setMemo] = useState(todoItem.memo || ''); // memo 초기값 설정
    const [InventoryModalVisible, setInventoryModalVisible] = useState(false);  //삭제, 수정, 메모 버튼 모달
    const [MemoModalVisible, setMemoModalVisible] = useState(false);  //메모 작성 모달

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
        const nextTodoList = todoList.filter((item) => item.id !== todoItem.id);
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
        setInventoryModalVisible(false);
    };

    // 수정
    const onClickEditButton = () => {
        setEdited(true); // 제목 수정 모드
        setInventoryModalVisible(false); // 모달 닫기
    };

    // 메모 버튼 클릭
    const onClickMemoButton = () => {
        setInventoryModalVisible(false);
        setMemoModalVisible(true);
    }

    const memoInput = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            memo: item.id === todoItem.id ? memo : item.memo,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList)); // 메모 저장
        setMemoModalVisible(false); // 메모 저장 후 모달 닫기
    };

    // 메모 입력 상태 업데이트
    const onChangeMemoInput = (e) => {
        setMemo(e.target.value);
    };

    // 메모 삭제
    const onChangeMemoDelete = () => {
        console.log('tkrwp');
        const nextTodoList = todoList.map((item) => ({
            ...item,
            memo: item.id === todoItem.id ? '' : item.memo,
        }));
        setTodoList(nextTodoList);
        setMemo('');
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList)); // 메모 저장
        setMemoModalVisible(false); // 메모 저장 후 모달 닫기
    }

    // 제목 수정 완료
    const onClickSubmitButton = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            text: item.id === todoItem.id ? newText : item.text,
        }));
        setTodoList(nextTodoList);
        window.localStorage.setItem("todoList", JSON.stringify(nextTodoList));
        setEdited(false); // 수정 완료 후 수정 모드 해제
    };

    // 제목 수정 중 상태 관리
    const onChangeEditInput = (e) => {
        setNewText(e.target.value);
    }

    // 엔터 키
    const onKeyDownInput = (e) => {
        if (e.key === 'Enter') {
            onClickSubmitButton();
        }
    };

    // 모달 true
    const onClickTitle = () => {
        setInventoryModalVisible(true);
    };

    // 모달 false
    const closeModal1 = () => {
        setInventoryModalVisible(false);
    };

    const closeModal2 = () => {
        memoInput(); // 메모 모달을 닫을 때 메모 저장
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
                        onKeyDown={onKeyDownInput}
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
                <button className="todoListinventory" onClick={onClickTitle}>...</button>

                {/* 모달(삭제, 수정, 메모 버튼) */}
                {InventoryModalVisible && (
                    <>
                        <div className="modal" onClick={closeModal1}></div>
                        <div className="modal-content">
                            {/* 수정 버튼 */}
                            <div className="modal-content-head">
                                <div className="modal-title1">{newText}</div>
                                <button type="button" className="modal_close_button" onClick={closeModal1}>x</button>
                            </div>
                            <button
                                type="button"
                                className="todoapp__item-edit-btn"
                                onClick={onClickEditButton}
                            >
                                수정
                            </button>
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
                                <div>
                                    {
                                        memo !== '' ?
                                            <div className="memo_info" onClick={onClickMemoButton}>{memo}</div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/*메모 작성 모달*/}
                {MemoModalVisible && (
                    <>
                        <div className="modal" onClick={onChangeMemoDelete}></div>
                        <div className="modal-content">
                            <div className="modal-content-head">
                                <button
                                    type="button"
                                    onClick={onChangeMemoDelete}
                                    className="modal_memo_delete_button"
                                >
                                    삭제
                                </button>
                                {newText}
                                <button
                                    type="button"
                                    onClick={closeModal2}
                                    className="modal_close_button"
                                >
                                    완료
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
                    </>
                )}
            </li>
        </div>
    );
};

ToDoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        memo: PropTypes.string,
    }),
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            checked: PropTypes.bool.isRequired,
            memo: PropTypes.string,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;
