import React from 'react';
import Urbit from '@urbit/http-api';
import Tome from 'tome-db';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// example using Tome
const db = new Tome(api);
const store = db.store();
const appPreferencesStash = store.create('app.preferences');
await appPreferencesStash.set('foo', 'bar');  // saying this doesn't exist, but it does. ??

export function App() {
  return (
    <main className="flex items-center justify-center min-h-screen">
    </main>
  );
}
