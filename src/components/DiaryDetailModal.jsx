import React from 'react';
import '../styles/Diary.css';

const DiaryDetailModal = ({
                              visible,
                              onClose,
                              uploadImgUrl,
                              diaryContent,
                              formattedDate,
                              dayEmoji,
                              onClickDiaryDetailButton
                          }) => {
    if (!visible) return null;

    return (
        <>
            <div className="diary_detail_modal" onClick={onClose}></div>
            <div className="diary_detail_modal-content">
                <div className="diary_detail_modal_content-head">
                    <button
                        type="button"
                        onClick={onClose}
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
                <div className="diary_detail_modal_emoji">
                    {dayEmoji}
                </div>
                <div className="diary_detail_modal_detail">
                    <div className="diary_detail_date">{formattedDate}</div>
                    {uploadImgUrl && (
                        <div className="diary_detail_img">
                            <img src={uploadImgUrl} alt="Uploaded" className="uploaded_img"/>
                        </div>
                    )}
                    <div className="diary_detail" style={{ whiteSpace: 'pre-wrap' }}>
                        {diaryContent}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiaryDetailModal;
