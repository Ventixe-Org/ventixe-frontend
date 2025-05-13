import React from 'react';

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kommande events</h2>
      <ul>
        {dummyEvents.map(ev => (
          <li key={ev.id} className="mb-3 p-3 border rounded">
            <h3 className="text-xl">{ev.title}</h3>
            <p className="text-sm text-gray-600">{ev.date}</p>
            <p>{ev.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
