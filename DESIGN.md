## Client Design

**Example**
```javascript
import tome from "@urbit/tome-db";

const db = await tome('uniswap');
const store = await db.store({read: 'our', write: 'desk'});
const appPreferencesStore = await store.create('app.preferences', {read: 'our', write: 'desk'});
appPreferencesStore.set('theme', 'dark');
```
**Step-by-step**
```javascript
const db = await tome('uniswap');
```
This constructor call creates a top level entry for the specified desk.  Permissions cannot be specified here, this responsibility falls on the different storage types (now only `store`).

Future work: Allow other desk names besides the current desk (necessary for composability).

```javascript
const store = await db.store({read: 'our', write: 'desk'});
```
Next, initialize the store with optional global permissions.  If not specified, defaults to `{read: 'our', write: 'desk'}`.

```javascript
const appPreferencesStore = await store.create('app.preferences', {read: 'our', write: 'desk'});
```
Finally, create a named bucket in the store with its own permissions.  If not specified, permissions default to `{read: 'unset', write: 'unset'}` [uses global permissions].

Since stores are namespaced by desk, they can duplicate names from another desks' stores.

To load an existing store:
```javascript
import { loadStore } from "@urbit/tome-db";
const appPreferencesStore = await loadStore('uniswap', 'app.preferences');
```

```javascript
appPreferencesStore.set('theme', 'dark');  // can pass numbers, bools, objects as value.  Will be stored in %tome-api as a cord
appPreferencesStore.set('foo', true);
appPreferencesStore.get('theme'); // 'dark'
appPreferencesStore.all(); // {'theme': 'dark', 'foo': true}
appPreferencesStore.remove('theme');  // only 'foo' left
appPreferencesStore.clear();  // all gone
```

## Permissioning:

`read`:  ability to read values.

`write`:  ability to write new values or overwrite existing values.


### Permission levels:

`desk`:  strictest, only _this_ desk can operate.

`our`:  any desk on our ship can operate.

`any`:  anyone on the network can operate.

`unset`: for nested values only. Uses the global store's permissions.  Stored as a reference (global changes will impact these).

future: more granularity - ability to provide a list of desks,
and/or a list of ships.  `invis`: Read requests are not denied but simply fail (for additional security)?


## Backend Design

### Pokes

- Initialization / permissions
  - `{ init-desk: { desk: 'uniswap' }}`: creates an entry for the specified desk.  Currently: this _must_ equal the source desk.
  - `{ init-kv: { desk: 'uniswap', permissions: { read: 'our', write: 'desk' }}}`:  Initializes permissions for kv store.  The `db.kv` call.
  - `{ create-kv-store: { desk: 'uniswap', store: 'app.preferences', permissions: { read: 'our', write: 'desk' }}}`:  Creates a named store and specifies permissions.  The `store.create` call.
  - _Additional pokes for modifying permissions, deleting desk data / stores, etc_

- `KV`: modify values
  - `{ set-kv: { desk: 'uniswap', store: 'app.preferences', key: 'theme', value: 'dark' }}`
  - `{ remove-kv: { desk: 'uniswap', store: 'app.preferences', key: 'theme' }}`
  - `{ clear-kv: { desk: 'uniswap', store: 'app.preferences' }}`

### Scries

- `KV`: retrieve values
  - `/x/<desk>/kv/<store>/json` Get everything in a store (`.all()`)
  - `/x/<desk>/kv/<store>/<key>/json` Get value associated with specific key in a store (`.get()`)
  - _Additional scries for viewing permissions or metadata associated with desks or stores_
