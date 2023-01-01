import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import './index.css'

import Stack from './components/Stack'

type CustomElement<T> = Partial<T & { children: any }>

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['stack-l']: CustomElement<Stack>
        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
)
