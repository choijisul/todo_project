//test
import { useState } from 'react';
// prop-types 모듈 import
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
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
    parse
} from 'date-fns';
import '../styles/Calendar.css';

// header
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            {/*년, 월*/}
            <span className="text">
                <span className="text year">
                    {format(currentMonth, 'yyyy')}년
                </span>
                <span className="text month">
                    {format(currentMonth, 'M')}월
                </span>
            </span>
            {/*달 이동*/}
            <span className="button next_month">
                <Icon icon="ooui:next-rtl" onClick={prevMonth} />
                <Icon icon="ooui:next-ltr" onClick={nextMonth} />
            </span>
        </div>
    );
};

RenderHeader.propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    prevMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
};

const RenderDays = () => {
    const days = [];
    const date = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday as the start of the week
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'empty'  // 현재 달이 아님. empty 클래스
                            : isSameDay(day, selectedDate)
                                ? 'selected'
                                : 'valid'
                    }`}
                    key={day}
                    onClick={() => isSameMonth(day, monthStart) && onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            !isSameMonth(day, monthStart)
                                ? 'text empty' // 데이터 비어있음. 빈 문자열.
                                : ''
                        }
                    >
                        {!isSameMonth(day, monthStart) ? '' : formattedDate}
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

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

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
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
};
