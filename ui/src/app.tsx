import React, {useState} from 'react';
import Urbit from '@urbit/http-api';
import Tome from 'tome-db';
import { Cascader, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

function transformJSON(json) {
  var transformed = [];

  for (var key in json) {
    transformed.push({
      label: key + ': ' + json[key],
      value: key + ': ' + json[key]
    });
  }

  return transformed;
}


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

const value = await appPreferencesStash.get('zulu'); //check console logging
console.log(value);

const dynamicOptions = [
  {
    "label": "desk",  //desk
    "value": 1,
    "children": [   //a variable amount of children based on how many stashes are in the store, label is the stashnames
      {
        "label": "stashname", //stash
        "value": 2
      },
      {
        "label": "stashname",  //stash, variable amount of children based on how many kv pairs are inside (try with one stash)
        "value": 3,
        "children": transformJSON(await appPreferencesStash.all()) //resolves to a promise        
      },
    ]
  }
]

// example using local storage
const local = new Tome();
const localStore = local.store();
const localStash = localStore.create('local.preferences');
await localStash.set('foo', 'bar');
await localStash.set('baz', 'lol');

const localval = await localStash.get('baz');
console.log(localval);

let resp = await localStash.all();
console.log(resp['foo']);  // TODO: is there a way to avoid TS complaints here?

await localStash.remove('foo');
resp = await localStash.all();
console.log(resp);

await localStash.clear();
resp = await localStash.all();
console.log(resp);

export function App() {
  const [options, setOptions] = useState(dynamicOptions);

  async function handleClick() {
    const key = prompt('Enter the key:');
    const value = prompt('Enter the value:');
    appPreferencesStash.set(key, value);
    setOptions([
      {
        "label": "desk",
        "value": 1,
        "children": [
          {
            "label": "stashname",
            "value": 2
          },
          {
            "label": "stashname",
            "value": 3,
            "children": transformJSON(await appPreferencesStash.all())
          },
        ]
      }
    ]);
  }

  const headers = [api.ship, 'Desk', 'Stash'];

  const buttons = [<Button onClick={() => {const store = db.store()}}>New Store</Button>, 
  <Button onClick={() =>{const createdStash = store.create(prompt("Enter Stash Name"))}}>Add Stash</Button>, 
  <Button onClick={handleClick}>Add Field</Button>];

  return (
    <div style={{
      display: 'block', width: 600, paddingLeft: 30
    }}>
      <h4>Tome DB</h4>
      <Cascader
        inline
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