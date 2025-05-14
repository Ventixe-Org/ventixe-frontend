import React, { useState } from 'react';

export const EventForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST till backend
    console.log({ title, date, description });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem 2rem' }}>
      <h2>Skapa nytt event</h2>
      <div>
        <label>Titel:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Datum:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label>Beskrivning:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button type="submit">Skapa</button>
    </form>
  );
};
