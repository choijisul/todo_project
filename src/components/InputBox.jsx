import {useState} from 'react';
import '../styles/Todo.css'

const InputBox = ({onAddClick}) => {
    const [text, setText] = useState("");
    const [inputVisible, setInputVisible] = useState(false);  // input 보임 여부

    const onChangeInput = (e) => {  //e.target에 있는 <input.../>으로부터 value값 가져옴
        setText(e.target.value);
    };

    const onClickAddButton = () => {   //클릭 이벤트(input 보임 여부)
        if (!inputVisible) {
            setInputVisible(true);
            return;
        }

        onAddClick({
            text: text
        })

        setText('');
        setInputVisible(false);
    }

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
            {inputVisible && (  //enter치면 추가되게 수정.
                <div>
                    <input
                        type="text"
                        name="todoItem"
                        value={text}
                        className="todoapp_inputbox-input"
                        onChange={onChangeInput}  //input 변하면 onChangeInput() 메소드 실행
                    />
                </div>
            )}
        </div>
    )
}

export default InputBox;
