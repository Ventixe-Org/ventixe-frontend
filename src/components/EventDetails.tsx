// src/components/EventDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type Event = { id: number; title: string; date: string; description: string };
type Registration = { name: string; email: string };

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [registration, setRegistration] = useState<Registration>({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // TODO: fetch från din Event Service
    setEvent({ id: Number(id), title: 'React Meetup', date: '2025-06-01', description: 'Lär dig mer om React.' });
  }, [id]);

  if (!event) return <p>Laddar…</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST till din Registration Service
    console.log('Registrering skickad:', registration);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <button onClick={() => navigate(-1)}>← Tillbaka</button>
      <h2>{event.title}</h2>
      <p><strong>Datum:</strong> {event.date}</p>
      <p>{event.description}</p>

      {submitted ? (
        <p>Tack för din anmälan!</p>
      ) : showForm ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <h3>Anmäl dig</h3>
          <div>
            <label>Namn:</label><br/>
            <input
              type="text"
              value={registration.name}
              onChange={e => setRegistration(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label>Email:</label><br/>
            <input
              type="email"
              value={registration.email}
              onChange={e => setRegistration(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <button type="submit">Skicka anmälan</button>
        </form>
      ) : (
        <button style={{ marginTop: '2rem' }} onClick={() => setShowForm(true)}>
          Anmäl dig
        </button>
      )}
    </div>
  );
};
