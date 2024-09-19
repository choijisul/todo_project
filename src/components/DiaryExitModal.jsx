import React from 'react';
import '../styles/Diary.css';

const DiaryExitModal = ({
                            visible,
                            onClose,
                            onClickDiaryExitButton,
                            onClickTemporaryStorageButton
                        }) => {
    if (!visible) return null;

    const closeDiaryExitModal = () => {
        onClose(false);
    };

    return (
        <>
            <div className="diary_detail_exit_modal" onClick={closeDiaryExitModal}></div>
            <div className="diary_detail_exit_modal_content">
                <h3 className="detail_exit_title">임시저장하시겠습니까?</h3>
                <button className="temporary_storage_button" onClick={onClickTemporaryStorageButton}>확인</button>
                <button className="detail_exit_button" onClick={onClickDiaryExitButton}>임시저장하지 않고 닫기</button>
                <button className="diary_exit_cancel_button" onClick={closeDiaryExitModal}>취소</button>
            </div>
        </>
    );
};

export default DiaryExitModal;
