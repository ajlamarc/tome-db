import React from 'react';
import Urbit from '@urbit/http-api';
import Tome from 'tome-db';
import { Cascader, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

console.log(api);

// example using Tome
const db = new Tome(api);
console.log(db);
const store = db.store();
const floor = db.store();
console.log(store);
console.log(floor);
const appPreferencesStash = store.create('app.preferences');
const floorstash = floor.create('floorstash');
console.log(floorstash);
console.log(store);
await appPreferencesStash.set('alice', 'bob');
await appPreferencesStash.set('charlie', 'david');

await floorstash.set('1', '2');

const floorvalue = await floorstash.get('1'); //check console logging
console.log(floorvalue);

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

  const headers = [api.ship, 'Desk', 'Stash'];

  const buttons = [<Button onClick={() => {const store = db.store()}}>New Store</Button>, 
  <Button onClick={() =>{const createdStash = store.create(prompt("Enter Stash Name"))}}>Add Stash</Button>, 
  <Button onClick={() => console.log("GHI")}>Add Field</Button>];

  /*

const db = new Tome(api);
console.log(db);
const store = db.store();

var x = prompt("Enter Stash Name")

use array[]?

const createdStash = store.create(x)}

later in the program im gonna need to reference the stash


const appPreferencesStash = store.create('app.preferences');
const floorstash = floor.create('floorstash');

await appPreferencesStash.set('alice', 'bob');
await appPreferencesStash.set('charlie', 'david');

await floorstash.set('1', '2');

const floorvalue = await floorstash.get('1'); //check console logging
console.log(floorvalue);

  */

  const options = [
    {
      "label": "desk",  //desk
      "value": 1,
      "children": [   //a variable amount of children based on how many stashes are in the store, label is the stashnames
        {
          "label": "stashname", //stash
          "value": 2
        },
        {
          "label": "stashname",  //stash, variable amount of children based on how many kv pairs are inside
          "value": 3,
          "children": [
            {
              "label": "key: value",  //kv pair or field
              "value": 4
            },
            {
              "label": "key: value",
              "value": 5
            },
            {
              "label": "key: value",
              "value": 6
            },
          ]
        },
      ]
    }
  ]
  
  return (
    <div style={{
      display: 'block', width: 600, paddingLeft: 30
    }}>
      <h4>Tome DB</h4>
      <Cascader
        inline
        getChildren={node => {
          return fetchNodes(node.id);
        }}
        renderMenu={(children, menu, parentNode, layer) => {
          return (
              <div>                   
                <div
                  style={{
                    background: '#154c94',
                    padding: '4px 10px',
                    color: ' #fff',
                    textAlign: 'center'
                  }}
                >
                {headers[layer]}
              </div>
              
              {buttons[layer]}
              
              {menu}
            </div>
          );
        }}
        block
        searchable={false}
        menuHeight="auto" 
        menuWidth={180}
        placeholder="TomeDB Placeholder Text"
        data={options}
      />
    </div>
  );
}

/*

show ship
show store (empty)
show stash (empty)
show active desks

onclick desk
show store and store contents

onclick stash
show stash and contents

onclick newstore
if store exists, print "already created"
else create store and print "store created"

onclick add stash
prompt for stash name
create stash with name
trigger onclick desk (to refresh store contents to show stash)

onclick add field
prompt for new field
create key value entry
trigger onclick stash (to refresh stash contents to show key values)

showchildren/formatting is key

there should be a method to show all stashes in a store

*/