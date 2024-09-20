import React from 'react';
import '../styles/Diary.css';

const DiaryDetailChangeModal = ({
                                    visible,
                                    onClose,
                                    onClickDiaryDetailChangeButton,
                                    onClickDiaryDetailDeleteButton
                                }) => {
    if (!visible) return null;

    const closeDiaryDetailChangeModal = () => {
        onClose(false);
    };

    return (
        <>
            <div className="diary_detail_change_modal" onClick={closeDiaryDetailChangeModal}></div>
            <div className="diary_detail_change_modal_content">
                <h3 className="detail_change_title">일기</h3>
                <button className="detail_change_button" onClick={onClickDiaryDetailChangeButton}>수정</button>
                <button className="detail_delete_button" onClick={onClickDiaryDetailDeleteButton}>삭제</button>
                <button className="diary_change_cancel_button" onClick={closeDiaryDetailChangeModal}>취소</button>
            </div>
        </>
    );
};

export default DiaryDetailChangeModal;
