// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { EventList } from './components/EventList';
import { EventDetails } from './components/EventDetails';
import { EventForm } from './components/EventForm';

function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <h1>Ventixe Event-system MVP</h1>
        <nav>
          <Link to="/events" className="App-link">Alla events</Link> |{' '}
          <Link to="/events/create" className="App-link">Skapa event</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/events/create" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="*" element={<EventList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
