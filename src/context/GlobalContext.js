import React, { useState } from 'react'
import firebase from "firebase"
import { DB_CONFIG } from '../config/config'


const app = !firebase.apps.length
? firebase.initializeApp(DB_CONFIG)
: firebase.app()
const storage = app.storage()
const auth = app.auth() // I need the reference here?

const initialContext = {
    app,
    storage,
    auth,
    user: "",
    inChatRoom: false,
    receiver: {},
}

const Context = React.createContext(initialContext)

export function GlobalContextProvider ({ children }) {
    const [ globalContext, setGlobalContext ] = useState(initialContext)

    return <Context.Provider value={{globalContext, setGlobalContext}}>
        {children}
    </Context.Provider>
}

export default Context

