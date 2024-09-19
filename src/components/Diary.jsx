import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import emojiDate from '../data/emoji.json';
import DiaryModal from './DiaryModal';
import DiaryDetailModal from './DiaryDetailModal';
import DiaryDetailChangeModal from './DiaryDetailChangeModal';
import DiaryExitModal from './DiaryExitModal';
import EmojiModal from './EmojiModal';
import '../styles/Diary.css';
import diaryIcon from '../assets/diary_icon.png';

const formatDate = (date) => {
    const d = new Date(date);
    return format(d, 'yyyyMMdd');
};

const getDiaryEntries = () => {
    const diaryEntries = localStorage.getItem('diaryEntries');
    return diaryEntries ? JSON.parse(diaryEntries) : {};
};

const saveDiaryEntries = (entries, isTemporary = false) => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    localStorage.setItem('temporaryStorage', JSON.stringify(isTemporary));
};

const getRecentEmojis = () => {
    const recentEmojis = localStorage.getItem('recentEmojis');
    return recentEmojis ? JSON.parse(recentEmojis) : [];
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

const isTemporarySaved = (date) => {
    const temporaryStorage = JSON.parse(localStorage.getItem('temporaryStorage')) || {};
    return temporaryStorage[date] || false;
};

const Diary = ({ selectedDate }) => {
    const [diaryModalVisible, setDiaryModalVisible] = useState(false);
    const [diaryDetailModalVisible, setDiaryDetailModalVisible] = useState(false);
    const [diaryExitModalVisible, setDiaryExitModalVisible] = useState(false);
    const [diaryDetailChangeModalVisible, setDiaryDetailChangeModalVisible] = useState(false);
    const [emojiModalVisible, setEmojiModalVisible] = useState(false);

    const [diaryContent, setDiaryContent] = useState('');
    const [uploadImgUrl, setUploadImgUrl] = useState("");
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [dayEmoji, setDayEmoji] = useState(0);
    const [temporaryStorage, setTemporaryStorage] = useState(false);

    useEffect(() => {
        if(!selectedDate) return;
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);
        const diaryEntry = diaryEntries[formattedDate] || { content: '', imageUrl: '', emoji: 0 };

        setDiaryContent(diaryEntry.content);
        setUploadImgUrl(diaryEntry.imageUrl);
        setDayEmoji(diaryEntry.emoji || 0);
        setTemporaryStorage(isTemporarySaved(formattedDate));

        const emojiList = emojiDate.find(item => item.id === "face1")?.emojis || [];
        setSelectedEmojis(emojiList);
    }, [selectedDate]);

    const onClickDiaryButton = () => {
        let today = new Date();
        const formattedToday = format(today, 'yyyyMMdd');
        const formattedSelectDay = format(selectedDate, 'yyyyMMdd');
        if (Number(formattedSelectDay) <= Number(formattedToday)) {
            if (dayEmoji === 0) {
                setDiaryModalVisible(true);
            } else {
                setDiaryDetailModalVisible(true);
            }
        } else {
            alert("미래의 일기는 작성할 수 없습니다");
        }
    };

    const onClickDiaryExitButton = () => {
        setDiaryModalVisible(false);
        setDiaryExitModalVisible(false);
        onClickDiaryDetailDeleteButton();
    };

    const onClickTemporaryStorageButton = () => {
        if (dayEmoji === 0) {
            alert("이모지를 선택해 주세요");
        } else {
            const diaryEntries = getDiaryEntries();
            const formattedDate = formatDate(selectedDate);

            diaryEntries[formattedDate] = {
                content: diaryContent,
                imageUrl: uploadImgUrl,
                emoji: dayEmoji,
            };
            saveDiaryEntries(diaryEntries, { ...temporaryStorage, [formattedDate]: true });

            setDiaryExitModalVisible(false);
            setDiaryModalVisible(false);
        }
    };

    const onClickDiaryDetailChangeButton = () => {
        setDiaryDetailModalVisible(false);
        setDiaryDetailChangeModalVisible(false);
        setDiaryModalVisible(true);
    };

    const onClickDiaryDetailDeleteButton = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);

        delete diaryEntries[formattedDate];

        saveDiaryEntries(diaryEntries);

        setDiaryContent('');
        setUploadImgUrl('');
        setSelectedEmojis([]);
        setDayEmoji(0);

        setDiaryDetailModalVisible(false);
        setDiaryDetailChangeModalVisible(false);
    };

    const closeEmojiModal = () => {
        setEmojiModalVisible(false);
    };

    const onClickImgDeletedButton = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);

        if (diaryEntries[formattedDate]) {
            delete diaryEntries[formattedDate].imageUrl;

            saveDiaryEntries(diaryEntries);
            setUploadImgUrl('');
        }
    };

    const handleDiaryContentChange = (e) => {
        setDiaryContent(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadImgUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveDiaryContent = () => {
        const diaryEntries = getDiaryEntries();
        const formattedDate = formatDate(selectedDate);

        diaryEntries[formattedDate] = {
            content: diaryContent,
            imageUrl: uploadImgUrl,
            emoji: dayEmoji,
        };

        if (dayEmoji !== 0 && diaryContent.trim() !== '') {
            saveDiaryEntries(diaryEntries);
            setDiaryModalVisible(false);
        } else {
            if (dayEmoji === 0) {
                alert("이모지를 선택해 주세요");
            }
            if (diaryContent.trim() === '') {
                alert("텍스트를 입력해 주세요");
            }
            setDiaryModalVisible(true);
        }
    };

    const formattedDate = new Date(selectedDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    });

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

    const onClickDayEmoji = (e) => {
        const emojiIndex = e.target.id;
        const selectedEmoji = selectedEmojis[emojiIndex];

        setDayEmoji(selectedEmoji);
        closeEmojiModal();

        saveRecentEmoji(selectedEmoji);
    };

    return (
        <div className="calendar-header">
            프로필
            <button
                type="button"
                onClick={onClickDiaryButton}
                className="diary_button"
            >
                {dayEmoji === 0 ? (
                    <img src={diaryIcon} className="diary_button_icon" />
                ) : (
                    <div className={`emoji ${temporaryStorage === true ? 'temporary_storage' : ''}`}>
                        {dayEmoji}
                    </div>
                )}
            </button>
            <DiaryModal
                visible={diaryModalVisible}
                onClose={setDiaryExitModalVisible}
                onSave={saveDiaryContent}
                uploadImgUrl={uploadImgUrl}
                onClickImgDeletedButton={onClickImgDeletedButton}
                diaryContent={diaryContent}
                onChangeDiaryContent={handleDiaryContentChange}
                formattedDate={formattedDate}
                onClickEmojiButton={setEmojiModalVisible}
                dayEmoji={dayEmoji}
                onImageUpload={handleImageUpload}
            />
            <DiaryDetailModal
                visible={diaryDetailModalVisible}
                onClose={setDiaryDetailModalVisible}
                uploadImgUrl={uploadImgUrl}
                diaryContent={diaryContent}
                formattedDate={formattedDate}
                dayEmoji={dayEmoji}
                onClickDiaryDetailButton={setDiaryDetailChangeModalVisible}
            />
            <DiaryDetailChangeModal
                visible={diaryDetailChangeModalVisible}
                onClose={setDiaryDetailChangeModalVisible}
                onClickDiaryDetailChangeButton={onClickDiaryDetailChangeButton}
                onClickDiaryDetailDeleteButton={onClickDiaryDetailDeleteButton}
            />
            <DiaryExitModal
                visible={diaryExitModalVisible}
                onClose={setDiaryExitModalVisible}
                onClickDiaryExitButton={onClickDiaryExitButton}
                onClickTemporaryStorageButton={onClickTemporaryStorageButton}
            />
            <EmojiModal
                visible={emojiModalVisible}
                onClose={setEmojiModalVisible}
                selectedEmojis={selectedEmojis}
                onClickEmojiSelect={onClickEmojiSelect}
                onClickDayEmoji={onClickDayEmoji}
            />
        </div>
    );
};

export default Diary;