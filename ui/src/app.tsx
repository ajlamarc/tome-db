import React from 'react';
import Urbit from '@urbit/http-api';
import Tome from 'tome-db';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

console.log(api);

// example using Tome
const db = new Tome(api);
console.log(db);
const store = db.store();
console.log(store);
const appPreferencesStash = store.create('app.preferences');
console.log(store);
await appPreferencesStash.set('alice', 'bob');
await appPreferencesStash.set('charlie', 'david');


/*

poke testing

api.poke({
  app: 'tome-api',
  mark: 'stash-action',
  json: { 'set-stash': { desk: window.desk, src: api.desk, sta: 'app.preferences', key: 'test', val: 'test' } }
})


const value2 = api.scry({
  app: 'tome-api',
  path: `/${window.desk}/${api.desk}/store/${'app.preferences'}/${'charlie'}/json`,
}).then((value: string) => value)
console.log(value2)
*/

const value = await appPreferencesStash.get('zulu'); //check console logging
console.log(value);

let resp = await appPreferencesStash.all();
console.log(resp['alice']);  // TODO: is there a way to avoid TS complaints here? resp[alice]

await appPreferencesStash.remove('alice');
resp = await appPreferencesStash.all();
console.log(resp);

await appPreferencesStash.clear();
resp = await appPreferencesStash.all();
console.log(resp);

// example using local storage
const local = new Tome();
const localStore = local.store();
const localStash = localStore.create('local.preferences');
await localStash.set('foo', 'bar');
await localStash.set('baz', 'lol');

const localval = await localStash.get('baz');
console.log(localval);

resp = await localStash.all();
console.log(resp['foo']);  // TODO: is there a way to avoid TS complaints here?

await localStash.remove('foo');
resp = await localStash.all();
console.log(resp);

await localStash.clear();
resp = await localStash.all();
console.log(resp);

export function App() {
  return (
    <main className="flex items-center justify-center min-h-screen">
    </main>
  );
}

//test commit