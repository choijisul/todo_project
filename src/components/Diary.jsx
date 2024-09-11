import React, {useEffect, useState} from "react";
import '../styles/Diary.css';
import {format} from "date-fns";
import emojiDate from '../data/emoji.json';  //json
// 이미지
import imgUploadIcon from '../assets/input_img_icon.png'
import diaryIcon from '../assets/diary_icon.png'
import recentlyUsedIcon from '../assets/recently_used_icon.png'

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
    const [diaryExitModalVisible, setDiaryExitModalVisible] = useState(false);
    const [diaryDetailChangeModal, setDiaryDetailChangeModal] = useState(false);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);
    const [diaryContent, setDiaryContent] = useState('');
    const [uploadImgUrl, setUploadImgUrl] = useState("");
    const [selectedEmojis, setSelectedEmojis] = useState([]);

    useEffect(() => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);
        const diaryEntry = diaryEntries[formattedDate] || {content: '', imageUrl: ''};
        setDiaryContent(diaryEntry.content);
        setUploadImgUrl(diaryEntry.imageUrl);
    }, [selectedDate]);

    // 일기 작성
    const onClickDiaryButton = () => {
        let today = new Date();
        const formattedToday = format(today, 'yyyyMMdd');
        const formattedSelectDay = format(selectedDate, 'yyyyMMdd');
        if (Number(formattedSelectDay) <= Number(formattedToday)) {
            if (diaryContent === '') {
                setDiaryModalVisible(true);
            } else {
                setDiaryDetailModalVisible(true);
            }
        } else {
            alert("미래의 일기는 작성할 수 없습니다")
        }
    };

    // 다이어리 모달 관련
    const onClickCloseDiaryModal = () => {
        setDiaryExitModalVisible(true);
    };

    const closeDiaryExitModal = () => {
        setDiaryExitModalVisible(false);
    }

    const onClickDiaryExitButton = () => {
        setDiaryModalVisible(false);
        setDiaryExitModalVisible(false);
        onClickDiaryDetailDeleteButton();
    }

    const onClickTemporaryStorageButton = () => {
        //     나중에 이모지 흐리게 하는 효과 추가해야 함.
        saveDiaryContent();
        setDiaryExitModalVisible(false);
    }

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
        setUploadImgUrl("");
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

    // 다이어리 사진
    const onChangeImgUpload = (e) => {
        const {files} = e.target;
        const uploadFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onloadend = () => {
            setUploadImgUrl(reader.result);
        }
    }

    const onClickImgDeletedButton = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);

        delete diaryEntries[formattedDate.imageUrl];

        saveDiaryEntries(diaryEntries);

        setUploadImgUrl("");
    }

    // 다이어리 내용
    const handleDiaryContentChange = (e) => {
        setDiaryContent(e.target.value);
    };

    const saveDiaryContent = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);
        diaryEntries[formattedDate] = {
            content: diaryContent,
            imageUrl: uploadImgUrl
        };
        saveDiaryEntries(diaryEntries);
        setDiaryModalVisible(false);
    };

    // 날짜 형식 바꿈 (+요일추가 해야함)
    const formattedDate = new Date(selectedDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // 이모지 관련
    const onClickEmojiSelect = (e) => {
        const emojiButtonId = e.target.id;
        console.log(emojiButtonId);
        const emojiList = emojiDate.find(item => item.id === emojiButtonId)?.emojis || [];
        setSelectedEmojis(emojiList);
    }

    return (
        <div className="calendar-header">
            프로필
            <button
                type="button"
                onClick={onClickDiaryButton}
                className="diary_button"
            >
                <img src={diaryIcon} className="diary_button_icon"/>
            </button>

            {/*일기 작성 모달*/}
            {diaryModalVisible && (
                <div className="diary_modal">
                    <div className="diary_modal-content">
                        <div className="diary_modal_content-head">
                            {/*제목, 나가기, 완료*/}
                            <button
                                type="button"
                                onClick={onClickCloseDiaryModal}
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
                                <img src={diaryIcon} className="diary_button_icon"/>
                            </button>
                        </div>
                        {/*일기*/}
                        <div className="diary_modal_day">
                            {formattedDate}
                        </div>
                        <div className="diary_modal_body">
                            <div className="diary_modal_input_img">
                                {uploadImgUrl && (
                                    <>
                                        <img src={uploadImgUrl} img="img" className="upload_img"/>
                                        <button className="img_deleted_button" onClick={onClickImgDeletedButton}>-
                                        </button>
                                    </>
                                )}
                            </div>
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
                            <label for="file" className="diary_input_img_label">
                                <img src={imgUploadIcon} className="upload_img_icon"/>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="diary_input_img"
                                    id="file"
                                    onChange={onChangeImgUpload}
                                >
                                </input>
                            </label>
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
                            {uploadImgUrl && (
                                <div className="diary_detail_img">
                                    <img src={uploadImgUrl} alt="Uploaded" className="uploaded_img"/>
                                </div>
                            )}
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
            {/*일기 임시저장 모달*/}
            {diaryExitModalVisible && (
                <div className="diary_detail_exit_modal">
                    <div className="diary_detail_exit_modal_content">
                        <h3 className="detail_exit_title">임시저장하시겠습니까?</h3>
                        <button className="temporary_storage_button" onClick={onClickTemporaryStorageButton}>확인</button>
                        <button className="detail_exit_button" onClick={onClickDiaryExitButton}>임시저장하지 않고 닫기</button>
                        <button className="diary_exit_cancel_button" onClick={closeDiaryExitModal}>취소</button>
                    </div>
                </div>
            )}
            {/* 이모지 모달 */}
            {emojiModalVisible && (
                <div className="emoji_modal">   {/*onClick={closeEmojiModal}*/}
                    <div className="emoji_modal-content">
                        <div className="emoji_modal_content-head">
                            <h5 className="emoji_modal_title">이모지</h5>
                        </div>
                        <div className="emoji_modal_container">
                            {/*map 이용해 JSON 이모지*/}
                                {selectedEmojis.map((emoji, index) => (
                                    <div key={index} className="emoji_collct">
                                        {emoji}
                                    </div>
                                ))}️
                        </div>
                        <div className="emoji_modal_footer">
                            {/*<button className="emoji_button" id="recently_used"><img src={recentlyUsedIcon} className="recently_used_icon"/></button>*/}
                            <button className="emoji_button" id="face1" onClick={onClickEmojiSelect}>😃</button>
                            <button className="emoji_button" id="face2" onClick={onClickEmojiSelect}>🤗</button>
                            <button className="emoji_button" id="hand" onClick={onClickEmojiSelect}>👋</button>
                            <button className="emoji_button" id="weather" onClick={onClickEmojiSelect}>🌈</button>
                            <button className="emoji_button" id="thing1" onClick={onClickEmojiSelect}>📚</button>
                            <button className="emoji_button" id="active" onClick={onClickEmojiSelect}>⚽️</button>
                            <button className="emoji_button" id="food" onClick={onClickEmojiSelect}>🍔</button>
                            <button className="emoji_button" id="animal" onClick={onClickEmojiSelect}>🐶</button>
                            <button className="emoji_button" id="thing2" onClick={onClickEmojiSelect}>🎉</button>
                            <button className="emoji_button" id="vehicle" onClick={onClickEmojiSelect}>🚗</button>
                            <button className="emoji_button" id="flag" onClick={onClickEmojiSelect}>🏁</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Diary;
