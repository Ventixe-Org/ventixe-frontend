import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './EventList.module.css'

type Event = {
    id: number
    title: string
    date: string
    description: string
    location?: string
}

export const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const base = process.env.REACT_APP_EVENTS_API

    useEffect(() => {
        fetch(`${base}/api/events`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.json()
            })
            .then((data: Event[]) => setEvents(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [base])

    if (loading) return <p>Laddar events…</p>
    if (error) return <p style={{ color: 'red' }}>Fel: {error}</p>
    if (events.length === 0) return <p>Inga events att visa.</p>

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Kommande events</h2>
            <ul className={styles.list}>
                {events.map(ev => (
                    <li key={ev.id} className={styles.card}>
                        <Link to={`/events/${ev.id}`} className={styles.linkReset}>
                            <h3>{ev.title}</h3>
                            <p className={styles.date}>
                                {new Date(ev.date).toLocaleDateString('sv-SE')}
                            </p>
                            <p>{ev.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
