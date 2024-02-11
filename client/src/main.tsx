import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {Provider} from 'react-redux'

import {imagesStore} from './store/images_store'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={imagesStore}>
            <App/>
        </Provider>
    </React.StrictMode>,
)
