import {useState, useRef, useEffect} from 'react';
import '../styles/Todo.css';

const InputBox = ({onAddClick}) => {
    const [text, setText] = useState("");
    const [inputVisible, setInputVisible] = useState(false);  // input 보임 여부
    const inputRef = useRef(null);  // input 참조

    const onChangeInput = (e) => {
        setText(e.target.value);
    };

    const onClickAddButton = () => {  // 클릭 이벤트(input 보임 여부)
        if (!inputVisible) {
            setInputVisible(true);
            return;
        }

        if (text.trim() === "") {  // 입력x
            setInputVisible(false);  // input 숨김
            return;
        }

        onAddClick({
            text: text
        });

        setText('');
        setInputVisible(false);
    };

    // 엔터 키
    const onKeyDownInput = (e) => {
        if (e.key === 'Enter') {
            onClickAddButton();
        }
    };

    // 버튼 클릭 -> input focus
    useEffect(() => {
        if (inputVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputVisible]);

    // input 바깥 클릭
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setInputVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="todoapp_inputbox">
            {/* 추가버튼 */}
            <button
                type="submit"
                className="todoapp_inputbox-add-btn"
                onClick={onClickAddButton}
            >
                추가
            </button>
            {inputVisible && (
                <div className="todoapp__item_input">
                    <input
                        type="checkbox"
                        className="todoapp__item-checkbox"
                    />
                    <input
                        type="text"
                        name="todoItem"
                        value={text}
                        className="todoapp_inputbox-input"
                        onChange={onChangeInput}  // input 변하면 onChangeInput() 메소드 실행
                        onKeyDown={onKeyDownInput}  // 엔터키
                        ref={inputRef}
                    />
                    <button className="todoListinventory-input">...</button>
                </div>
            )}
        </div>
    )
}

export default InputBox;
