import React from 'react'
import Urbit from '@urbit/http-api'
import { ThemeProvider } from 'styled-components'
import { theme as baseTheme } from './theme/theme.js'
import { GlobalStyle } from './theme/App.styles.js'
import { Stack, Sidebar, Grid, Box, Cover, Center } from './components/index.js'
import {
    ChevronRight,
    Database,
    MoreVertical,
    Package,
    Plus,
    Server,
} from 'react-feather'
import Tome from 'tome-db'

const api = new Urbit('', '', window.desk)
api.ship = window.ship

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

// // example using local storage
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

export class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={baseTheme['light']}>
                <GlobalStyle />
                <Cover space="var(--s-1)" centered=".db" className="body">
                    <Box padding="0" className="flex-grow db">
                        <div className="db-content">
                            <div className="column">
                                <Box
                                    padding="var(--s-1)"
                                    borderRadius="0px"
                                    borderWidth="0px 0px 2px 0px"
                                    className="header"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="with-icon">
                                            <Server className="icon" />{' '}
                                            <p>lomder-librun</p>
                                        </span>
                                    </div>
                                </Box>
                                <Box
                                    padding="var(--s-1)"
                                    borderRadius="0px"
                                    borderWidth="0px 0px 2px 0px"
                                    className="add-container"
                                    onClick={() => {
                                        console.log('clicked')
                                    }}
                                >
                                    <span className="with-icon add">
                                        <Plus className="icon" />{' '}
                                        <p>New store</p>
                                    </span>
                                </Box>
                                <Box
                                    padding="var(--s-1)"
                                    borderRadius="0px"
                                    borderWidth="0px 0px 2px 0px"
                                    className="row"
                                >
                                    <div className="flex items-center justify-between row-item">
                                        <p>Uniswap</p>
                                        <ChevronRight className="icon" />
                                    </div>
                                </Box>
                            </div>
                            <div className="column">
                                <Box
                                    padding="var(--s-1)"
                                    borderRadius="0px"
                                    borderWidth="0px 0px 2px 0px"
                                    className="header"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="with-icon">
                                            <Database className="icon" />{' '}
                                            <p>uniswap</p>
                                        </span>
                                        <MoreVertical className="icon" />
                                    </div>
                                </Box>
                            </div>
                            <div className="column">
                                <Box
                                    padding="var(--s-1)"
                                    borderRadius="0px"
                                    borderWidth="0px 0px 2px 0px"
                                    className="header"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="with-icon">
                                            <Package className="icon" />{' '}
                                            <p>app.preferences</p>
                                        </span>
                                        <MoreVertical className="icon" />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </Box>
                </Cover>
            </ThemeProvider>
        )
    }
}
