import React from 'react';
import { EventList } from './components/EventList';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl">Ventixe Event-system MVP</h1>
      </header>
      <main>
        <EventList />
      </main>
    </div>
  );
}

export default App;
