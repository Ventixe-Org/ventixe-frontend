import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

type Event = {
    id: number
    title: string
    date: string
    description: string
    location?: string
}

type Registration = {
    id: number
    eventId: number
    name: string
    email: string
    created: string
}

export const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [event, setEvent] = useState<Event | null>(null)
    const [loadingEvent, setLoadingEvent] = useState(true)
    const [eventError, setEventError] = useState<string | null>(null)

    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loadingRegs, setLoadingRegs] = useState(true)
    const [regError, setRegError] = useState<string | null>(null)

    const [showForm, setShowForm] = useState(false)
    const [registration, setRegistration] = useState({ name: '', email: '' })
    const [submitted, setSubmitted] = useState(false)

    const eventsBase = process.env.REACT_APP_EVENTS_API
    const regsBase = process.env.REACT_APP_REGS_API

    useEffect(() => {
        fetch(`${eventsBase}/api/events/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Kunde inte hämta event (${res.status})`)
                return res.json()
            })
            .then(setEvent)
            .catch(err => setEventError(err.message))
            .finally(() => setLoadingEvent(false))
    }, [id, eventsBase])

    useEffect(() => {
        setLoadingRegs(true)
        fetch(`${regsBase}/api/registrations?eventId=${id}`)
            .then(res => {
                if (res.status === 404) {
                    setRegistrations([])
                    return
                }
                if (!res.ok) throw new Error(`Kunde inte hämta anmälningar (${res.status})`)
                return res.json()
            })
            .then((data: Registration[] | void) => {
                if (data) setRegistrations(data)
            })
            .catch(err => setRegError(err.message))
            .finally(() => setLoadingRegs(false))
    }, [id, submitted, regsBase])

    if (loadingEvent) return <p>Laddar event…</p>
    if (eventError) return <p style={{ color: 'red' }}>{eventError}</p>
    if (!event) return <p>Eventet hittades inte.</p>

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch(`${regsBase}/api/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId: event.id, ...registration }),
        })
            .then(res => {
                if (!res.ok) throw new Error(`Kunde inte anmäla (${res.status})`)
                return res.json()
            })
            .then(() => {
                setSubmitted(true)
                setShowForm(false)
                setRegistration({ name: '', email: '' })
            })
            .catch(err => setRegError(err.message))
    }

    return (
        <div style={{ padding: '1rem 2rem' }}>
            <button onClick={() => navigate(-1)}>← Tillbaka</button>
            <h2>{event.title}</h2>
            <p><strong>Datum:</strong> {new Date(event.date).toLocaleDateString('sv-SE')}</p>
            {event.location && <p><strong>Plats:</strong> {event.location}</p>}
            <p>{event.description}</p>

            {submitted
                ? <p>Tack för din anmälan!</p>
                : showForm
                    ? (
                        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                            <h3>Anmäl dig</h3>
                            <label>Namn:</label><br />
                            <input
                                type="text"
                                value={registration.name}
                                onChange={e => setRegistration(p => ({ ...p, name: e.target.value }))}
                                required
                            /><br /><br />
                            <label>Email:</label><br />
                            <input
                                type="email"
                                value={registration.email}
                                onChange={e => setRegistration(p => ({ ...p, email: e.target.value }))}
                                required
                            /><br />
                            <button type="submit" style={{ marginTop: '1rem' }}>Skicka anmälan</button>
                            {regError && <p style={{ color: 'red' }}>Fel: {regError}</p>}
                        </form>
                    )
                    : <button onClick={() => setShowForm(true)} style={{ marginTop: '2rem' }}>Anmäl dig</button>
            }

            <hr style={{ margin: '2rem 0' }} />
            <h3>Anmälda ({registrations.length})</h3>
            {loadingRegs
                ? <p>Laddar anmälningar…</p>
                : regError
                    ? <p style={{ color: 'red' }}>Fel: {regError}</p>
                    : registrations.length === 0
                        ? <p>Inga anmälningar än.</p>
                        : (
                            <ul>
                                {registrations.map(r => (
                                    <li key={r.id}>
                                        {r.name} ({r.email}) –{' '}
                                        {new Date(r.created).toLocaleString('sv-SE')}
                                    </li>
                                ))}
                            </ul>
                        )
            }
        </div>
    )
}
