import { buildMonthGrid, getDateKey } from '../utils/calendar.js';
const WEEKDAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export default function CalendarGrid({currentDate,selectedDate,events,onSelectDate}){
 const days=buildMonthGrid(currentDate);
 function getEventsForDay(date){ const key=getDateKey(date); return events.filter(event=>event.startTime && getDateKey(new Date(event.startTime))===key); }
 return <div className="calendar-grid-wrap"><div className="weekday-row">{WEEKDAYS.map(day=><div key={day} className="weekday-cell">{day}</div>)}</div><div className="calendar-grid">{days.map(day=>{ const dayEvents=getEventsForDay(day.date); const isSelected=getDateKey(day.date)===getDateKey(selectedDate); return <button key={day.dateKey} className={['day-card',!day.isCurrentMonth?'muted':'',day.isToday?'today':'',day.isPast?'past':'',isSelected?'selected':''].join(' ')} onClick={()=>onSelectDate(day.date)}><span className="past-x" aria-hidden="true">×</span><span className="day-number">{day.number}</span><div className="event-pips">{dayEvents.slice(0,3).map(event=><span key={event.id} className="event-pill">{new Date(event.startTime).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})} {event.title}</span>)}{dayEvents.length>3 && <span className="more-events">+{dayEvents.length-3} more</span>}</div></button>; })}</div></div>;
}
