import React from 'react';
import '../styles/Diary.css';
import recentlyUsedIcon from '../assets/recently_used_icon.png';
import emojiDate from "../data/emoji.json";

const EmojiModal = ({
                        visible,
                        onClose,
                        selectedEmojis,
                        setSelectedEmojis,
                        setDayEmoji,
                        // getRecentEmojis,
                    }) => {
    if (!visible) return null;

    const closeEmojiModal = () => {
        onClose(false);
    };

    const getRecentEmojis = () => {
        const recentEmojis = localStorage.getItem('recentEmojis');
        return recentEmojis ? JSON.parse(recentEmojis) : [];
    };

    const onClickEmojiSelect = (e) => {
        const emojiButtonId = e.target.id;

        if (emojiButtonId === "recently_used") {
            const recentEmojis = getRecentEmojis();
            setSelectedEmojis(recentEmojis);
        } else {
            const emojiList = emojiDate.find(item => item.id === emojiButtonId)?.emojis || [];
            setSelectedEmojis(emojiList);
        }
    };

    const saveRecentEmoji = (emoji) => {
        let recentEmojis = getRecentEmojis();
        recentEmojis = recentEmojis.filter(e => e !== emoji);
        recentEmojis.unshift(emoji);
        if (recentEmojis.length > 18) {
            recentEmojis.pop();
        }
        localStorage.setItem('recentEmojis', JSON.stringify(recentEmojis));
    };

    const onClickDayEmoji = (e) => {
        const emojiIndex = e.target.id;
        const selectedEmoji = selectedEmojis[emojiIndex];

        setDayEmoji(selectedEmoji);
        closeEmojiModal();

        saveRecentEmoji(selectedEmoji);
    };

    return (
        <>
            <div className="emoji_modal" onClick={closeEmojiModal}></div>
            <div className="emoji_modal-content">
                <div className="emoji_modal_content-head">
                    <h5 className="emoji_modal_title">이모지</h5>
                </div>
                <div className="emoji_modal_container">
                    {selectedEmojis.map((emoji, index) => (
                        <div key={index} className="emoji_collct" onClick={onClickDayEmoji} id={index}>
                            {emoji}
                        </div>
                    ))}
                </div>
                <div className="emoji_modal_footer">
                    <button className="emoji_select_button" id="recently_used" onClick={onClickEmojiSelect}>
                        <img src={recentlyUsedIcon} className="recently_icon"/>
                    </button>
                    <button className="emoji_select_button" id="face1" onClick={onClickEmojiSelect}>😃</button>
                    <button className="emoji_select_button" id="face2" onClick={onClickEmojiSelect}>🤗</button>
                    <button className="emoji_select_button" id="hand" onClick={onClickEmojiSelect}>👋</button>
                    <button className="emoji_select_button" id="weather" onClick={onClickEmojiSelect}>🌈</button>
                    <button className="emoji_select_button" id="thing1" onClick={onClickEmojiSelect}>📚</button>
                    <button className="emoji_select_button" id="active" onClick={onClickEmojiSelect}>⚽️</button>
                    <button className="emoji_select_button" id="food" onClick={onClickEmojiSelect}>🍔</button>
                    <button className="emoji_select_button" id="animal" onClick={onClickEmojiSelect}>🐶</button>
                    <button className="emoji_select_button" id="thing2" onClick={onClickEmojiSelect}>🎉</button>
                    <button className="emoji_select_button" id="vehicle" onClick={onClickEmojiSelect}>🚗</button>
                    <button className="emoji_select_button" id="flag" onClick={onClickEmojiSelect}>🏁</button>
                </div>
            </div>
        </>
    );
};

export default EmojiModal;
