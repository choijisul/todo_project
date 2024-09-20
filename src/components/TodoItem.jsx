import React, {useState, useRef, useEffect} from 'react';
import * as PropTypes from "prop-types";
import '../styles/Todo.css';
import InventoryModal from './InventoryModal.jsx';
import MemoModal from "./MemoModal.jsx";
// 이미지
import memoIcon from '../assets/memo_icon.png';

const RawTodoItem = ({todoItem, onTodoItemChanged, onTodoItemDeleted}) => {
    console.log("Greeting was rendered at", todoItem.id, new Date().toLocaleTimeString());
    const [inventoryModalVisible, setInventoryModalVisible] = useState(false);
    const [memoModalVisible, setMemoModalVisible] = useState(false);

    const [edited, setEdited] = useState(false);
    const [newText, setNewText] = useState(todoItem.text);
    const [memo, setMemo] = useState(todoItem.memo || '');

    const editInputRef = useRef(null);

    useEffect(() => {
        if (edited) {
            editInputRef.current.focus();
        }
    }, [edited]);

    const setTodoItem = (newItem) => {
        // 함수로 줘서 에러 -> 배열로 바꿈. (로직 바꿈)
        const newTodoItem = newItem(todoItem)
        onTodoItemChanged(newTodoItem);
    }

    // 체크박스 상태
    const onChangeCheckbox = () => {
        const newCheckedState = !todoItem.checked;
        setTodoItem(prevItem => {
            if(prevItem.checked === newCheckedState){
                return prevItem;
            }
            return {
                ...prevItem,
                checked: newCheckedState,
            }
        })
        // setTodoItem(prevItem => ({
        //     ...prevItem,
        //     checked: !prevItem.checked,
        // }))
    };

    // list 삭제
    const onClickDeleteButton = () => {
        onTodoItemDeleted(todoItem.id);
        setInventoryModalVisible(false);
    };

    // todo 수정
    const onClickEditButton = () => {
        setEdited(true);
        setInventoryModalVisible(false);
    };

    // 메모 관련
    const onClickMemoButton = () => {
        setInventoryModalVisible(false);
        setMemoModalVisible(true);
    }

    const memoInput = () => {
        setTodoItem(prevItem => ({
            ...prevItem,
            memo: memo,
        }))
        setMemoModalVisible(false);
    };

    // 메모 입력 상태
    const onChangeMemoInput = (e) => {
        setMemo(e.target.value);
    };

    // 메모 삭제
    const onChangeMemoDelete = () => {
        setTodoItem( prevItem => ({
            ...prevItem,
            memo: '',
        }))
        setMemo('');
        setMemoModalVisible(false);
    }

    // 제목 수정 완료
    const onClickSubmitButton = () => {
        setTodoItem(prevItem => ({
            ...prevItem,
            text: newText,
        }))
        setEdited(false); //수정 모드 해제
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

    const onClickTitle = () => {
        setInventoryModalVisible(true);
    };

    const closeInventoryModal = () => {
        setInventoryModalVisible(false);
    };

    const closeMemoModal = () => {
        memoInput();
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
                {/* 제목 수정 모드에 따른 input */}
                {edited ? (
                    <input
                        type="text"
                        className="detail_change_input"
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
                        {memo !== "" && (
                            <div className="check_memo"><img src={memoIcon} className="memo_icon"/>메모</div>
                        )}
                </span>
                )}
                <button className="todoListinventory" onClick={onClickTitle}>...</button>

                {/* 삭제, 수정, 메모 모달 컴포넌트*/}
                {inventoryModalVisible && (
                    <InventoryModal
                        newText={newText}
                        closeInventoryModal={closeInventoryModal}
                        onClickEditButton={onClickEditButton}
                        onClickDeleteButton={onClickDeleteButton}
                        onClickMemoButton={onClickMemoButton}
                        memo={memo}
                    />
                )}
                {/*메모 작성 모달 컴포넌트*/}
                {memoModalVisible && (
                    <MemoModal
                        newText={newText}
                        memo={memo}
                        onChangeMemoInput={onChangeMemoInput}
                        onChangeMemoDelete={onChangeMemoDelete}
                        closeMemoModal={closeMemoModal}/>
                )}
            </li>
        </div>
    );
};

RawTodoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.number,
        day: PropTypes.string,
        text: PropTypes.string.isRequired,
        memo: PropTypes.string,
        checked: PropTypes.bool.isRequired,
        deleted: PropTypes.bool.isRequired,
    }),
    onTodoItemChanged: PropTypes.func.isRequired,
    onTodoItemDeleted: PropTypes.func.isRequired,
};

// const TodoItem = React.memo(RawTodoItem, (prevProps, nextProps) => {
//     return prevProps.todoItem.checked === nextProps.todoItem.checked &&
//         prevProps.todoItem.text === nextProps.todoItem.text &&
//         prevProps.todoItem.memo === nextProps.todoItem.memo;
// })
// export default TodoItem;

const TodoItem = React.memo(RawTodoItem);
export default  TodoItem;