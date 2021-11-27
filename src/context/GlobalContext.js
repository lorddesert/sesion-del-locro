import React, { useState } from 'react'
import { initializeApp } from "firebase/app"
import { DB_CONFIG } from '../config/config'


const app = initializeApp(DB_CONFIG)
const storage = app.storage
const auth = app.auth() // I need the reference here?

const initialContext = {
    app,
    storage,
    auth,
    user: "",
    inChatRoom: false,
    receiver: {
        ref: {}
    },
    
}

const Context = React.createContext(initialContext)

export function GlobalContextProvider ({ children }) {
    const [ globalContext, setGlobalContext ] = useState(initialContext)

    return <Context.Provider value={{globalContext, setGlobalContext}}>
        {children}
    </Context.Provider>
}

export default Context

