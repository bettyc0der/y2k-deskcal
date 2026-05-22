import { addDays, endOfMonth, endOfWeek, format, isBefore, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
export function buildMonthGrid(currentDate){ const start=startOfWeek(startOfMonth(currentDate),{weekStartsOn:0}); const end=endOfWeek(endOfMonth(currentDate),{weekStartsOn:0}); const days=[]; let cursor=start; while(cursor<=end){ days.push({ date:cursor, dateKey:format(cursor,'yyyy-MM-dd'), number:format(cursor,'d'), isCurrentMonth:isSameMonth(cursor,currentDate), isToday:isSameDay(cursor,new Date()), isPast:isBefore(cursor,new Date(new Date().setHours(0,0,0,0))) }); cursor=addDays(cursor,1); } return days; }
export function getMonthLabel(date){ return format(date,'MMMM yyyy'); }
export function getDateKey(date){ return format(date,'yyyy-MM-dd'); }
export function getInputDateTime(date){ return format(date,"yyyy-MM-dd'T'HH:mm"); }
