import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const EventForm: React.FC = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, description, location })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Misslyckades (${res.status})`)
        return res.json()
      })
      .then(() => {
        navigate('/events')
      })
      .catch(err => {
        console.error(err)
        setError(err.message)
      })
      .finally(() => setSaving(false))
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem 2rem' }}>
      <h2>Skapa nytt event</h2>

      {error && <p style={{ color: 'red' }}>Fel: {error}</p>}

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Titel:</label><br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Datum:</label><br />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Plats:</label><br />
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Beskrivning:</label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows={4}
          style={{ width: '100%' }}
        />
      </div>

      <button type="submit" disabled={saving}>
        {saving ? 'Sparar…' : 'Skapa event'}
      </button>
    </form>
  )
}
