import { useEffect, useMemo, useState } from 'react';
import { getInputDateTime } from '../utils/calendar.js';

export default function EventPanel({
  selectedDate,
  events,
  defaultReminderMinutes,
  onSaveEvent,
  onDeleteEvent
}) {
  const defaultStart = useMemo(() => {
    const date = new Date(selectedDate);
    date.setHours(9, 0, 0, 0);
    return getInputDateTime(date);
  }, [selectedDate]);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(defaultStart);
  const [reminderMinutes, setReminderMinutes] = useState(defaultReminderMinutes || 60);

  useEffect(() => {
    setStartTime(defaultStart);
  }, [defaultStart]);

  useEffect(() => {
    setReminderMinutes(defaultReminderMinutes || 60);
  }, [defaultReminderMinutes]);

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const parsedStart = new Date(startTime);
    if (Number.isNaN(parsedStart.getTime())) {
      alert('Please choose a valid date and time for the event.');
      return;
    }

    await onSaveEvent({
      title: cleanTitle,
      startTime: parsedStart.toISOString(),
      reminderMinutes: Number(reminderMinutes || 60),
      notes: '',
      source: 'local'
    });

    setTitle('');
    setStartTime(defaultStart);
  }

  return (
    <section className="panel">
      <div className="window-titlebar compact">
        <span>DAY_FILE.DAT</span>
        <span className="window-controls">_ □ ×</span>
      </div>

      <h2>
        {selectedDate.toLocaleDateString([], {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })}
      </h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add local event..."
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>
          Bell before event
          <select
            value={reminderMinutes}
            onChange={(e) => setReminderMinutes(Number(e.target.value))}
          >
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
            <option value={1440}>1 day</option>
          </select>
        </label>

        <button className="button ghost full" type="submit">
          Save Event
        </button>
      </form>

      <div className="day-event-list">
        {events.length === 0 && (
          <p className="empty">No events for this date yet.</p>
        )}

        {events.map((event) => (
          <article key={event.id} className="day-event">
            <strong>{event.title}</strong>
            <span>
              {new Date(event.startTime).toLocaleString([], {
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
            <small>Bell: {event.reminderMinutes || 60} minutes before</small>
            <button
              className="tiny-button"
              type="button"
              onClick={() => onDeleteEvent(event.id)}
            >
              delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
