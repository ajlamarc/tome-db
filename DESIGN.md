## Client Design

**Example**
```javascript
import tome from "@urbit/tome-db";

const db = await tome();
const store = await db.kv({read: 'our', write: 'desk'});
const appPreferencesStore = await store.create('app.preferences', {read: 'our', write: 'desk'});
appPreferencesStore.set('theme', 'dark');
```
**Step-by-step**
```javascript
const db = await tome();
```
This constructor call creates a top level entry for the current desk, ex. `'uniswap'`.  Permissions cannot be specified here, this responsibility falls on the individual stores.

Future work: Allow optional desk name to be passed here (for reading/writing to other desk stores).

```javascript
const store = await db.kv({read: 'our', write: 'desk'});
```
Next, initialize a `kv` bucket with optional global permissions.  If not specified, defaults to `{read: 'our', write: 'desk'}`.

```javascript
const appPreferencesStore = await store.create('app.preferences', {read: 'our', write: 'desk'});
```
Finally, create a named store inside the `kv` bucket with its own local permissions.  If not specified, defaults to `{read: 'unset', write: 'unset'}`, and uses the global permissions.

Since stores are namespaced by desk, they can duplicate names from another stores.

To load an existing store:
```javascript
const appPreferencesStore = await tome.kv.load('app.preferences');
```

Example usage:

```javascript
appPreferencesStore.set('theme', 'dark');  // can pass numbers, bools, objects as value.  Will be stored in %tome-api as a cord
appPreferencesStore.set('foo', true);
appPreferencesStore.get('theme'); // 'dark'
appPreferencesStore.all(); // {'theme': 'dark', 'foo': true}
appPreferencesStore.remove('theme');  // only 'foo' left
appPreferencesStore.clear();  // all gone
```

### Permissioning:

`read`:  ability to read values.

`write`:  ability to write new values or overwrite existing values.


### Permission levels:

`desk`:  strictest, only _this_ desk can operate.

`our`:  any desk on our ship can operate.

`any`:  anyone on the network can operate.

`unset`: for nested values only. Uses the global store's permissions.  Stored as a reference (global changes will impact these).

future: more granularity - ability to provide a list of desks,
and/or a list of ships.



