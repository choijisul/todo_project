import React, {useEffect, useState} from "react";
import '../styles/Diary.css';

const getDiaryEntries = () => {
    const diaryEntries = localStorage.getItem('diaryEntries');
    return diaryEntries ? JSON.parse(diaryEntries) : [];
};

const saveDiaryEntries = (entries) => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
};

const Diary = ({selectedDate}) => {
    const [diaryModalVisible, setDiaryModalVisible] = useState(false);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);
    const [diaryContent, setDiaryContent] = useState('');

    useEffect(() => {
        const diaryEntries = getDiaryEntries();
        const currentEntry = diaryEntries.find(entry => entry.day === selectedDate);
        if (currentEntry) {
            setDiaryContent(currentEntry.text);
        } else {
            setDiaryContent('');
        }
    }, [selectedDate]);

    const onClickDiaryButton = () => {
        setDiaryModalVisible(true);
    }

    // 모달 관련
    const closeDiaryModal = () => {
        setDiaryModalVisible(false);
    }

    const onClickEmojiButton = () => {
        setEmojiModalVisible(true);
    }

    const closeEmojiModal = () => {
        setEmojiModalVisible(false);
    }

    const handleDiaryContentChange = (e) => {
        setDiaryContent(e.target.value);
    }

    const saveDiaryContent = () => {
        const diaryEntries = getDiaryEntries();
        const updatedEntries = diaryEntries.filter(entry => entry.day !== selectedDate);
        updatedEntries.push({day: selectedDate, text: diaryContent});
        saveDiaryEntries(updatedEntries);
        closeDiaryModal();
    }

    // 날짜 형식 바꿈 (+요일추가 해야함)
    const formattedDate = new Date(selectedDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="calendar-header">
            프로필
            <button
                type="button"
                onClick={onClickDiaryButton}
                className="diary_button"
            >
                일기
            </button>

            {/*일기보달*/}
            {diaryModalVisible && (
                <div className="diary_modal">
                    <div className="diary_modal-content">
                        <div className="diary_modal_content-head">
                            {/*제목, 나가기, 완료*/}
                            <button
                                type="button"
                                onClick={closeDiaryModal}
                                className="diary_modal_close_button"
                            >
                                x
                            </button>
                            <h3 className="diary_modal_title">일기</h3>
                            <button
                                type="button"
                                className="diary_modal_finish_button"
                                onClick={saveDiaryContent}
                            >
                                완료
                            </button>
                        </div>
                        {/*이모지*/}
                        <div className="diary_modal_emoji">
                            <button
                                className="emogi_button"
                                onClick={onClickEmojiButton}
                            >
                                이모지
                            </button>
                        </div>
                        {/*일기*/}
                        <div className="diary_modal_day">
                            {formattedDate}
                        </div>
                        <div className="diary_modal_body">
                            <textarea
                                type="text"
                                className="diary_modal_input_diary"
                                placeholder={"OO님의 오늘은 어떤 하루였나요?"}
                                value={diaryContent}
                                onChange={handleDiaryContentChange}
                            />
                        </div>
                        {/*부가적인..*/}
                        <div className="diary_modal_footer">
                            <button
                                className="get_img_button"
                            >
                                사진
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {/* 이모지 모달 */}
            {emojiModalVisible && (
                <div className="emoji_modal" onClick={closeEmojiModal}>
                    <div className="emoji_modal-content">
                        <div className="emoji_modal_content-head">
                            <h5 className="emoji_modal_title">이모지</h5>
                        </div>
                        <div className="emoji_modal_container">
                            <div className="emoji_collct">️</div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>

                        </div>
                        <div className="emoji_modal_footer">
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">😀</button>
                            <button className="emoji_button">🤗</button>
                            <button className="emoji_button">👋</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Diary;
