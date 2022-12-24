## Client Design

### Naming convention

TomeDB can create a `store` for any `desk`.  Each store can have many `stashes` (hold key-value pairs).

**Example**
```javascript
import tome from "@urbit/tome-db";

const db = await tome('uniswap');
const store = await db.store({read: 'our', write: 'desk'});
const appPreferencesStash = await store.create('app.preferences', {read: 'our', write: 'desk'});
appPreferencesStash.set('theme', 'dark');
```
**Step-by-step**
```javascript
const db = await tome('uniswap');
```
This constructor call creates a top level entry for the specified desk.  Permissions cannot be specified here, this responsibility falls on the different storage types (now only `store`).
Default: the current desk, `window.desk`.

```javascript
const store = await db.store({read: 'our', write: 'our'});
```
Next, initialize the store with optional global permissions.  If not specified, defaults to `{read: 'our', write: 'our'}`.

```javascript
const appPreferencesStash = await store.create('app.preferences', {read: 'our', write: 'desk'});
```
Finally, create a stash in the store with its own permissions.  If not specified, permissions default to `{read: 'our', write: 'desk'}`.

Stashes can have duplicate names if they are in different desks (stores).

To load an existing stash:
```javascript
import { loadStash } from "@urbit/tome-db";
const appPreferencesStash = await loadStash('uniswap', 'app.preferences');
```

```javascript
appPreferencesStash.set('theme', 'dark');  // can pass numbers, bools, objects as value.  Will be stored in %tome-api as a cord
appPreferencesStash.set('foo', true);
appPreferencesStash.get('theme'); // 'dark'
appPreferencesStash.all(); // {'theme': 'dark', 'foo': true}
appPreferencesStash.remove('theme');  // only 'foo' left
appPreferencesStash.clear();  // all gone
```

## Permissioning:

`read`:  ability to read values.

`write`:  ability to write new values or overwrite existing values.


### Permission levels:

`desk`:  strictest, only _this_ desk can operate.

`our`:  any desk on our ship can operate.

`team`:  our ship, or any moon of us, can operate.

`any`:  anyone on the network can operate.

future: more granularity - ability to provide a list of desks,
and/or a list of ships.  `invis`: Read requests are not denied but simply fail (for additional security)?


## Backend Design

### Pokes

- Initialization / permissions.  `desk` is the desk to apply to, `src` is the desk requesting
  - `{ init-tome: { desk: 'uniswap', src: 'uniswap' }}`: creates a tome for the specified desk.  Currently: this _must_ equal the source desk.
  - `{ init-store: { desk: 'uniswap', src: 'uniswap', perm: { read: 'our', write: 'desk' }}}`:  Initializes permissions for store.  The `db.store` call.
  - `{ init-stash: { desk: 'uniswap', src: 'uniswap', sta: 'app.preferences', perm: { read: 'our', write: 'desk' }}}`:  Creates a stash and specifies permissions.  The `store.create` call.
  - _Additional pokes for modifying permissions, deleting desk data / stashes, etc_

- `Stash`: modify values
  - `{ set-stash: { desk: 'uniswap', src: 'uniswap', sta: 'app.preferences', key: 'theme', val: 'dark' }}`
  - `{ remove-stash: { desk: 'uniswap', src: 'uniswap', sta: 'app.preferences', key: 'theme' }}`
  - `{ clear-stash: { desk: 'uniswap', src: 'uniswap', sta: 'app.preferences' }}`

### Scries

- `Stash`: retrieve values
  - `/x/<desk>/<src>/store/<name>/json` Get everything in a stash (`.all()`)
  - `/x/<desk>/<src>/store/<name>/<key>/json` Get value associated with specific key in a stash (`.get()`)
  - _Additional scries for viewing permissions or metadata associated with desks, stores, or stashes_
