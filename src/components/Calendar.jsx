import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
} from 'date-fns';
import '../styles/Calendar.css';
// 이미지
import diaryCheckIcon from '../assets/diary_check_icon.png'
import todoCheckIcon from '../assets/calendar_todo_check.png'
import calendarTodo from '../assets/calendar_todo.png'

// header
const RenderHeader = ({currentMonth, prevMonth, nextMonth}) => {
    // 한 달 완료된 todo
    const monthTodoFinishCheck = () => {
        const todoMap = JSON.parse(localStorage.getItem('todoMap')) || {};
        let completedDaysCount = 0;

        // 한 달 날짜별 비교
        for (let day = startOfMonth(new Date(currentMonth)); day <= endOfMonth(new Date(currentMonth)); day = addDays(day, 1)) {
            const formattedDay = format(day, 'yyyyMMdd');
            const dayTodos = todoMap[formattedDay] || [];
            if (dayTodos.length === 0) continue;

            // 한 달에 완료된 todo count
            const completedTodos = dayTodos.filter(item => item.checked === true).length;
            completedDaysCount += completedTodos;
        }

        return completedDaysCount;
    }

    // 한 달 작성 다이어리
    const monthDiaryWriteCheck = () => {
        const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries')) || {};
        let diaryCount = 0;

        const start = startOfMonth(new Date(currentMonth));
        const end = endOfMonth(new Date(currentMonth));

        for (const date in diaryEntries) {
            // 연도, 월, 일 추출
            const entryDate = new Date(
                parseInt(date.slice(0, 4)),
                parseInt(date.slice(4, 6)) - 1,
                parseInt(date.slice(6, 8))
            );

            if(entryDate >= start && entryDate <= end){
                diaryCount++;
            }
        }
        return diaryCount;
    }

    return (
        <div className="header row">
            <span className="button write">
            {/* 일기 추가 */}
            </span>
            {/* 년, 월 */}
            <span className="text">
                <span className="text year">
                    {format(currentMonth, 'yyyy')}년
                </span>
                <span className="text month">
                    {format(currentMonth, 'M')}월
                </span>
            </span>
            {/* 한 달 완료한 too, 일기 */}
            <span className="month_finish_todo">
                <div className="todo_head_icon"><img src={todoCheckIcon} className="todo_check_icon"/></div>
                {monthTodoFinishCheck()}
            </span>
            <span className="month_write_diary">
                <div className="diary_head_icon"><img src={diaryCheckIcon} className="diary_check_icon"/></div>
                {monthDiaryWriteCheck()}
            </span>
            {/* 달 이동 */}
            <span className="button next_month">
                <Icon icon="ooui:next-rtl" onClick={prevMonth}/>
                <Icon icon="ooui:next-ltr" onClick={nextMonth}/>
            </span>
        </div>
    );
};


RenderHeader.propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    prevMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
};

// 요일
const RenderDays = () => {
    const days = [];
    const date = ['월', '화', '수', '목', '금', '토', '일'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({currentMonth, selectedDate, onDateClick}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
    const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    // 날짜별 남은 todo
    const todoListRemainderCheck = (day) => {
        const todoMap = JSON.parse(localStorage.getItem('todoMap')) || {};
        const formattedDay = format(day, 'yyyyMMdd');
        const todoList = todoMap[formattedDay] || [];

        // 'checked'가 false인 항목의 개수 계산
        const uncheckedTodos = todoList.filter(item =>
            item.day === formattedDay && item.checked === false && item.deleted === false
        );

        // todo 다 한 경우
        const todosLength = todoList.filter(item =>
            item.day === formattedDay && item.checked === true && item.deleted === false
        )

        if (uncheckedTodos.length > 0) {
            return (
                <h1 className="unchecked_todo_num">{uncheckedTodos.length}</h1>
            )
        } else if (todosLength.length === todosLength.length - uncheckedTodos.length && todosLength.length !== 0) {
            return (
                <div className="finishTodo">
                    <img src={todoCheckIcon} className="calendar_check_icon"/>
                </div>
            )
        }
    };

    // 일
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'empty'  // 현재 달이 아님
                            : isSameDay(day, selectedDate) ? 'selected' : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span
                        className={
                            !isSameMonth(day, monthStart)
                                ? 'text empty'
                                : ''
                        }
                    >
                        {!isSameMonth(day, monthStart) ? '' : (
                            <>
                                {/*남은 todo 수*/}
                                <div className="finishTodoListNum">
                                    {todoListRemainderCheck(day)}
                                    <img src={calendarTodo} className="calendar_todo_icon"/>
                                </div>
                                {/*날짜*/}
                                <div className={`day ${
                                    isSameDay(day, selectedDate) ? 'selected' : 'valid'
                                }`}>
                                    {formattedDate}
                                </div>
                            </>
                        )}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};


RenderCells.propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    onDateClick: PropTypes.func.isRequired,
};

export const Calendar = ({onSelectedDateChange}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {  //selectedDate가 ㅂ바뀌었을 때 호출
        onSelectedDateChange(selectedDate);
    }, [selectedDate]);

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    return (
        <div>
            <div className="calendar">
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays/>
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
        </div>
    );
};
