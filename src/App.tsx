// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import { EventList } from './components/EventList';
import { EventForm } from './components/EventForm';
import { EventDetails } from './components/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <MainLayout title="Events">
        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/events/create" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
