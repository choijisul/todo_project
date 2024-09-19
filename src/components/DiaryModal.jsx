import React from 'react';
import '../styles/Diary.css';
import imgUploadIcon from '../assets/input_img_icon.png';
import diaryIcon from '../assets/diary_icon.png';

const DiaryModal = ({
                        visible,
                        onClose,
                        onSave,
                        uploadImgUrl,
                        onChangeImgUpload,
                        onClickImgDeletedButton,
                        diaryContent,
                        onChangeDiaryContent,
                        formattedDate,
                        onClickEmojiButton,
                        dayEmoji
                    }) => {
    if (!visible) return null;

    const onClickCloseDiaryModal = () => {
        onClose(true);
    };

    const openEmojiModal = () => {
        onClickEmojiButton(true);
    };

    return (
        <div className="diary_modal">
            <div className="diary_modal-content">
                <div className="diary_modal_content-head">
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
                        onClick={onSave}
                    >
                        완료
                    </button>
                </div>
                <div className="diary_modal_emoji">
                    {dayEmoji === 0 ? (
                        <button
                            className="emoji_button"
                            onClick={openEmojiModal}
                        >
                            <img src={diaryIcon} className="diary_button_icon" alt="Add Emoji"/>
                        </button>
                    ) : (
                        <button className="day_emoji_button" onClick={openEmojiModal}>
                            {dayEmoji}
                        </button>
                    )}
                </div>
                <div className="diary_modal_day">
                    {formattedDate}
                </div>
                <div className="diary_modal_body">
                    <div className="diary_modal_input_img">
                        {uploadImgUrl && (
                            <>
                                <img src={uploadImgUrl} alt="Uploaded" className="upload_img"/>
                                <button className="img_deleted_button" onClick={onClickImgDeletedButton}>-</button>
                            </>
                        )}
                    </div>
                    <textarea
                        type="text"
                        className="diary_modal_input_diary"
                        placeholder="OO님의 오늘은 어떤 하루였나요?"
                        value={diaryContent}
                        onChange={onChangeDiaryContent}
                        style={{ whiteSpace: 'pre-wrap' }}
                    />
                </div>
                <div className="diary_modal_footer">
                    <label htmlFor="file" className="diary_input_img_label">
                        <img src={imgUploadIcon} className="upload_img_icon" alt="Upload"/>
                        <input
                            type="file"
                            accept="image/*"
                            className="diary_input_img"
                            id="file"
                            onChange={onChangeImgUpload}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};


export default DiaryModal;
