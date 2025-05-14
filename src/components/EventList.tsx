import React from 'react';
import styles from './EventList.module.css';

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const dummyEvents: Event[] = [
  { id: 1, title: 'React Meetup', date: '2025-06-01', description: 'Lär dig mer om React.' },
  { id: 2, title: 'Azure Workshop', date: '2025-06-15', description: 'Bygg molnapplikationer.' },
];

export const EventList: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kommande events</h2>
      <ul className={styles.list}>
        {dummyEvents.map(ev => (
          <li key={ev.id} className={styles.card}>
            <h3>{ev.title}</h3>
            <p className={styles.date}>{ev.date}</p>
            <p>{ev.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
