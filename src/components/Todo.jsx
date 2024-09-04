import { useRef, useState } from 'react';

const InputBox = () => {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    const onChangeInput = (e) => {  //e.target에 있는 <input.../>으로부터 value값 가져옴
        setText(e.target.value);
    };

    const onClickAddButton = () => {   //클릭 이벤트
        setText('');
        inputRef.current.focus();
    }

    return (
        <div className="todoapp_inputbox">
            <input
                type="text"
                name="todoItem"
                value={text}
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

const Todo = () => {
    const [todoList, setTodoList] = useState([]);

    return(
        <div className="homepage_container">
            <InputBox todoList={todoList} setTodoList={setTodiList}/>
        </div>
    )
}