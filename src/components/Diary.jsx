import React, {useCallback, useState} from "react";
import '../styles/Diary.css'

const Diary = ({ selectedDate }) => {  // selectedDate를 객체
    const [diaryModalVisible, setDiaryModalVisible] = useState(false);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);


    const onClickDiaryButton = () => {
        setDiaryModalVisible(true);
    }

    const closeDiaryModal = () => {
        setDiaryModalVisible(false);
    }

    const onClickEmojiButton = () => {
        setEmojiModalVisible(true);
    }

    const closeEmojiModal = () => {
        setEmojiModalVisible(false);
    }

    return (
        <div className="calendar-header">
            프로필
            <button
                type="button"
                onClick={onClickDiaryButton}
            >
                일기
            </button>
            {/*일기 모달*/}
            {diaryModalVisible && (
                <div className="diary_modal">
                    <div className="diary_modal-content">
                        {/*제목, 나가기, 완료*/}
                        <div className="diary_modal_content-head">
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
                                className="diary_modal_finish_button">
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
                        <div className="diary_modal_body">
                            <div>
                                {/*{selectedDate}   날짜 출력 에러*/}
                            </div>
                            <textarea
                                type="text"
                                className="emoji_modal_input_diary"
                                placeholder={"OO님의 오늘은 어떤 하루였나요?"}
                            />
                        </div>
                        {/*부가적인..*/}
                        <div className="diary_modal_floot">
                            <button
                                className="get_img_button"
                                // onClick={onUploadImg}
                            ></button>
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
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                            <div className="emoji_collct"></div>
                        </div>
                        <div className="emoji_modal_footer">
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
                            <button className="emoji_button">oo</button>
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
    )
}

export default Diary;
