import Urbit from '@urbit/http-api'
import Tome from 'tome-db'

// Initialize the Urbit connection
const api = new Urbit('', '', window.desk)
api.ship = window.ship

// ******** URBIT BACKEND *************

console.warn('Using an Urbit Backend: \n\n')
const db = new Tome(api)

const store = db.store()

const appPreferencesStash = store.create('app.preferences')
console.log(
    "Adding 'alice': 'bob' and 'charlie': 'david' to the key-value store:"
)
await appPreferencesStash.set('alice', 'bob')
await appPreferencesStash.set('charlie', 'david')

console.log('All values currently in the key-value store: ')
let resp = await appPreferencesStash.all()
console.log(resp)

console.log("Attempting to retrieve a missing value 'zulu': ")
let value = await appPreferencesStash.get('zulu')

console.log("Retrieve value for 'alice': ")
value = await appPreferencesStash.get('alice')
console.log(value)

console.log("Now remove 'alice' and get all again: ")
await appPreferencesStash.remove('alice')
resp = await appPreferencesStash.all()
console.log(resp)

console.log('Now clear the store and get all again: ')
await appPreferencesStash.clear()
resp = await appPreferencesStash.all()
console.log(resp)

// ******** LOCAL STORAGE *************

console.warn('Using Local Storage: \n\n')
const local = new Tome()
const localStore = local.store()

const localPreferencesStash = localStore.create('app.preferences')
console.log(
    "Adding 'alice': 'bob' and 'charlie': 'david' to the key-value store:"
)
await localPreferencesStash.set('alice', 'bob')
await localPreferencesStash.set('charlie', 'david')

console.log('All values currently in the key-value store: ')
resp = await localPreferencesStash.all()
console.log(resp)

console.log("Attempting to retrieve a missing value 'zulu': ")
value = await localPreferencesStash.get('zulu')

console.log("Retrieve value for 'alice': ")
value = await localPreferencesStash.get('alice')
console.log(value)

console.log("Now remove 'alice' and get all again: ")
await localPreferencesStash.remove('alice')
resp = await localPreferencesStash.all()
console.log(resp)

console.log('Now clear the store and get all again: ')
await localPreferencesStash.clear()
resp = await localPreferencesStash.all()
console.log(resp)
