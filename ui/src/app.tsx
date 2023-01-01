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
// import Tome from 'tome-db'

// const api = new Urbit('', '', window.desk)
// api.ship = window.ship

// // console.log(api)

// // example using Tome
// const db = new Tome(api)
// //console.log(db)
// const store = db.store()
// // console.log(store)
// const appPreferencesStash = store.create('app.preferences')
// // console.log(store)
// await appPreferencesStash.set('alice', 'bob')
// await appPreferencesStash.set('charlie', 'david')

// /*

// poke testing

// api.poke({
//   app: 'tome-api',
//   mark: 'stash-action',
//   json: { 'set-stash': { desk: window.desk, src: api.desk, sta: 'app.preferences', key: 'test', val: 'test' } }
// })

// const value2 = api.scry({
//   app: 'tome-api',
//   path: `/${window.desk}/${api.desk}/store/${'app.preferences'}/${'charlie'}/json`,
// }).then((value: string) => value)
// console.log(value2)
// */

// const value = await appPreferencesStash.get('zulu') //check console logging
// console.log(value)

// let resp = await appPreferencesStash.all()
// console.log(resp.get('alice'))

// await appPreferencesStash.remove('alice')
// resp = await appPreferencesStash.all()
// console.log(resp)

// await appPreferencesStash.clear()
// resp = await appPreferencesStash.all()
// console.log(resp)

// // example using local storage
// const local = new Tome()
// const localStore = local.store()
// const localStash = localStore.create('local.preferences')
// await localStash.set('foo', 'bar')
// await localStash.set('baz', 'lol')

// const localval = await localStash.get('baz')
// console.log(localval)

// resp = await localStash.all()
// console.log(resp.get('foo')) // TODO: is there a way to avoid TS complaints here?

// await localStash.remove('foo')
// resp = await localStash.all()
// console.log(resp)

// await localStash.clear()
// resp = await localStash.all()
// console.log(resp)

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
                                            <p>~lomder-librun</p>
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
