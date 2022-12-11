import React from 'react';
import Urbit from '@urbit/http-api';
import Tome from 'tome-db';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

// example using Tome
const db = new Tome(api);
const store = db.store();
const appPreferencesStash = store.create('app.preferences');
await appPreferencesStash.set('foo', 'bar');
await appPreferencesStash.set('baz', 'lol');

const value = await appPreferencesStash.get('foo');
console.log(value);

let resp = await appPreferencesStash.all();
console.log(resp['foo']);  // TODO: is there a way to avoid TS complaints here?

await appPreferencesStash.remove('foo');
resp = await appPreferencesStash.all();
console.log(resp);

await appPreferencesStash.clear();
resp = await appPreferencesStash.all();
console.log(resp);

export function App() {
  return (
    <main className="flex items-center justify-center min-h-screen">
    </main>
  );
}
