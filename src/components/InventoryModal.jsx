// InventoryModal.jsx
import React from 'react';
import PropTypes from 'prop-types';

const InventoryModal = ({ newText, closeInventoryModal, onClickEditButton, onClickDeleteButton, onClickMemoButton, memo }) => {
    return (
        <>
            <div className="modal" onClick={closeInventoryModal}></div>
            <div className="modal-content">
                <div className="modal-content-head">
                    <div className="modal-title1">{newText}</div>
                    <button type="button" className="modal_close_button" onClick={closeInventoryModal}>x</button>
                </div>
                <button type="button" className="todoapp__item-edit-btn" onClick={onClickEditButton}>수정</button>
                <button type="button" className="todoapp__item-delete-btn" onClick={onClickDeleteButton}>삭제</button>
                <div className="modal-memo">
                    <button type="button" className="todoapp__item-memo-btn" onClick={onClickMemoButton}>메모</button>
                    <div>
                        {memo !== '' && (
                            <div className="memo_info" onClick={onClickMemoButton} style={{ whiteSpace: 'pre-wrap' }}>
                                {memo}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

InventoryModal.propTypes = {
    newText: PropTypes.string.isRequired,
    closeInventoryModal: PropTypes.func.isRequired,
    onClickEditButton: PropTypes.func.isRequired,
    onClickDeleteButton: PropTypes.func.isRequired,
    onClickMemoButton: PropTypes.func.isRequired,
    memo: PropTypes.string.isRequired,
};

export default InventoryModal;
