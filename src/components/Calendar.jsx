//test
import {useEffect, useState} from 'react';
// prop-types 모듈 import
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
import todoItem from "./TodoItem.jsx";

// header
const RenderHeader = ({currentMonth, prevMonth, nextMonth}) => {
    const monthTodoRemainderCheck = () => {
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        let completedDaysCount = 0;

        // 한 달 날짜별 비교
        for (let day = startOfMonth(new Date(currentMonth)); day <= endOfMonth(new Date(currentMonth)); day = addDays(day, 1)) {
            const formattedDay = format(day, 'yyyyMMdd');
            //
            const dayTodos = todoList.filter(item => item.day === formattedDay && item.deleted === false);
            if (dayTodos.length === 0) continue;  //todo 목록 없음.
            // 날짜 목록 check 확인
            const allChecked = dayTodos.every(item => item.checked === true);
            if (allChecked) {
                completedDaysCount++;
            }
        }

        return completedDaysCount;
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
            {/* 이번달 완벽한 todo */}
            <span className="month_finish_todo">
                <div className="todo_head_icon"> {/* 아이콘 */}</div>
                {monthTodoRemainderCheck()}
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

// 요일 지정
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

    // 날짜별 남은 todo, todo 다 한 경우
    const todoListRemainderCheck = (day) => {
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        const formattedDay = format(day, 'yyyyMMdd'); // 날짜를 YYYYMMDD 형식으로 변환

        // 해당 날짜의 'checked'가 false인 항목의 개수 계산
        const uncheckedTodos = todoList.filter(item =>
            item.day === formattedDay && item.checked === false && item.deleted === false
        );

        // todo 다 한 경우
        const todosLength = todoList.filter(item =>
            item.day === formattedDay && item.checked === true && item.deleted === false
        )

        if(uncheckedTodos.length > 0) {
            return uncheckedTodos.length;
        }else if( todosLength.length === todosLength.length - uncheckedTodos.length && todosLength.length !== 0){
            return (
                <div className="finishTodo">
                    v
                </div>
            )
        }

    };

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'empty'  // 현재 달이 아님. empty 클래스
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
                                {/*remain todo*/}
                                <div className="finishTodoListNum">
                                    {todoListRemainderCheck(day)}
                                </div>
                                {/*date*/}
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
            <div className="calendar-header">
                프로필
                <button
                    type="button"
                >
                    일기
                </button>
            </div>
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
