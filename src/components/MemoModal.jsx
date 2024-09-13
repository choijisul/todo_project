// MemoModal.jsx
import React from 'react';
import PropTypes from 'prop-types';

const MemoModal = ({ newText, memo, onChangeMemoInput, onChangeMemoDelete, closeMemoModal }) => {
    return (
        <>
            <div className="modal" onClick={onChangeMemoDelete}></div>
            <div className="modal-content">
                <div className="modal-content-head">
                    <button type="button" onClick={onChangeMemoDelete} className="modal_memo_delete_button">삭제</button>
                    {newText}
                    <button type="button" onClick={closeMemoModal} className="modal_close_button">완료</button>
                </div>
                <textarea
                    type="text"
                    value={memo}
                    className="todoapp__item-memo-textarea"
                    onChange={onChangeMemoInput}
                    onBlur={closeMemoModal} // 포커스 해제 시 저장
                    style={{ whiteSpace: 'pre-wrap' }}
                />
            </div>
        </>
    );
};

MemoModal.propTypes = {
    newText: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    onChangeMemoInput: PropTypes.func.isRequired,
    onChangeMemoDelete: PropTypes.func.isRequired,
    closeMemoModal: PropTypes.func.isRequired,
};

export default MemoModal;
