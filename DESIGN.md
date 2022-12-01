**Example**
JS package design:

```javascript
import tome from "@urbit/tome-db";

const db = await tome();
const appPreferencesStore = await db.kv('app.preferences', {read: 'our', write: 'desk'});
appPreferencesStore.set('theme', 'dark');  // can pass numbers, bools, objects as value.  Will be stored in %tome-api as a cord
```

```javascript
const db = await tome({read: 'our', write: 'desk'});
```
This constructor call creates a top level entry for the current desk. ex. `'uniswap'`
Permissioning is a hierarchy: if a specific store doesn't specify permissions, it defaults to
this top level.  Default behavior: this ship can read, only our desk can write.

Future work: Allow optional desk name (for reading/writing to other desk stores).

```javascript
const appPreferencesStore = await db.kv('app.preferences', {read: 'our', write: 'desk'});
```
Same permissioning style as above, now we specify a key-value store with a specific name.
Since these are namespaced by desk, this can duplicate a name from another desk.

To use again:
```javascript
const appPreferencesStore = await tome().kv('app.preferences');
```


```javascript
appPreferencesStore.set('theme', 'dark');  // can pass numbers, bools, objects as value.  Will be stored in %tome-api as a cord
appPreferencesStore.get('theme'); // 'dark'
appPreferencesStore.all(); // {'theme', 'dark'}
appPreferencesStore.remove('theme');
appPreferencesStore.clear();
```

Permissioning:

`read`:  read the value.

`write`:  write new values or overwrite existing values.


Permission levels:

`desk`:  strictest, only _this_ desk can operate.

`our`:  any desk on our ship can operate.

`all`:  any desk on any ship can operate.


future: more granularity - ability to provide a list of desks,
and/or a list of ships.



