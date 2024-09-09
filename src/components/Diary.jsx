import React, {useEffect, useState} from "react";
import '../styles/Diary.css';

// 날짜 형식 변환
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

//일기 가져옴.
const getDiaryEntries = () => {
    const diaryEntries = localStorage.getItem('diaryEntries');
    return diaryEntries ? JSON.parse(diaryEntries) : {};  //JSON
};

// 일기 저장 (JSON)
const saveDiaryEntries = (entries) => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
};

const Diary = ({selectedDate}) => {
    const [diaryModalVisible, setDiaryModalVisible] = useState(false);
    const [diaryDetailModalVisible, setDiaryDetailModalVisible] = useState(false);
    const [diaryDetailChangeModal, setDiaryDetailChangeModal] = useState(false);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);
    const [diaryContent, setDiaryContent] = useState('');

    useEffect(() => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);
        setDiaryContent(diaryEntries[formattedDate] || '');
    }, [selectedDate]);

    const onClickDiaryButton = () => {
        if (diaryContent === '') {
            setDiaryModalVisible(true);
        } else {
            setDiaryDetailModalVisible(true);
        }
    };

    // 다이어리 모달 관련
    const closeDiaryModal = () => {
        setDiaryModalVisible(false);
    };

    const closeDiaryDetailModal = () => {
        setDiaryDetailModalVisible(false);
    }

    const onClickDiaryDetailButton = () => {
        setDiaryDetailChangeModal(true);
    }

    const closeDiaryDetailChangeModal = () => {
        setDiaryDetailChangeModal(false);
    }

    const onClickDiaryDetailChangeButton = () => {
        setDiaryDetailModalVisible(false);
        setDiaryDetailChangeModal(false);
        setDiaryModalVisible(true);
    }

    const onClickDiaryDetailDeleteButton = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);

        delete diaryEntries[formattedDate];  //일기 삭제

        saveDiaryEntries(diaryEntries);  //localstorage에 저장

        setDiaryContent('');
        setDiaryDetailModalVisible(false);
        setDiaryDetailChangeModal(false);
    }

    // 다이어리 이모지 관련
    const onClickEmojiButton = () => {
        setEmojiModalVisible(true);
    };

    const closeEmojiModal = () => {
        setEmojiModalVisible(false);
    };

    // 다이어리 내용
    const handleDiaryContentChange = (e) => {
        setDiaryContent(e.target.value);
    };

    const saveDiaryContent = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);
        diaryEntries[formattedDate] = diaryContent;
        saveDiaryEntries(diaryEntries);
        closeDiaryModal();
    };

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

            {/*일기 작성 모달*/}
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
            {/*일기 내용 모달*/}
            {diaryDetailModalVisible && (
                <div className="diary_detail_modal">
                    <div className="diary_detail_modal-content">
                        <div className="diary_detail_modal_content-head">
                            <button
                                type="button"
                                onClick={closeDiaryDetailModal}
                                className="diary_detail_close_button"
                            >
                                x
                            </button>
                            <h3 className="diary_modal_title">일기</h3>
                            <button
                                type="button"
                                onClick={onClickDiaryDetailButton}
                                className="diary_detail_change_button"
                            >
                                ...
                            </button>
                        </div>
                        {/*이모지*/}
                        <div className="diary_detail_modal_emoji">
                            {/*    나중에 이모지 넣음*/}
                        </div>
                        <div className="diary_detail_modal_detail">
                            <div className="diary_detail_date">{formattedDate}</div>
                            <div className="diary_detail">{diaryContent}</div>
                        </div>
                    </div>
                </div>
            )}
            {/*일기 내용 수정 모달*/}
            {diaryDetailChangeModal && (
                <div className="diary_detail_change_modal">
                    <div className="diary_detail_change_modal_content">
                        <h3 className="detail_change_title">일기</h3>
                        <button className="detail_change_button" onClick={onClickDiaryDetailChangeButton}>수정</button>
                        <button className="detail_delete_button" onClick={onClickDiaryDetailDeleteButton}>삭제</button>
                        <button className="diary_change_cancel_button" onClick={closeDiaryDetailChangeModal}>취소</button>
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
};

export default Diary;
