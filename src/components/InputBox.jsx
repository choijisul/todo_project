import {useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";

const InputBox = ({todoList, setTodoList}) => {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    const onChangeInput = (e) => {  //e.target에 있는 <input.../>으로부터 value값 가져옴
        setText(e.target.value);
    };

    const onClickAddButton = () => {   //클릭 이벤트
        const nextTodoList = todoList.concat({
            id: todoList.length,
            text,
        })
        setTodoList(nextTodoList);
        console.log(todoList);  //todoList에 들어가나 확인

        setText('');
        inputRef.current.focus();
    }



    return (
        <div className="todoapp_inputbox">
            <input
                type="text"
                name="todoItem"
                value={text}
                ref={inputRef}
                className="todoapp_inputbox-inp"
                onChange={onChangeInput}  //input 변하면 onChangeInput() 메소드 실행
            />
            {/* 추가버튼 */}
            <button
                type="submit"
                className="todoapp_inputbox-add-btn"
                onClick={onClickAddButton}
            >
                추가
            </button>
        </div>
    )
}

//props값 검증
InputBox.propTypes = {
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired
    ),
    setTodoList: PropTypes.func.isRequired,
}

export default InputBox;