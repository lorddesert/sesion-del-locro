import React, { useState } from 'react'
import firebase from "firebase/app"
import storage from 'firebase/storage'
import { DB_CONFIG } from '../config/config'


const app = !firebase.apps.length
? firebase.initializeApp(DB_CONFIG)
: firebase.app()
const auth = app.auth

const initialContext = {
    // app,
    // // usersStorage,
    // auth,
    // user: "",

    // They will be shared between Chat and Contacts
}

console.log(initialContext)

const Context = React.createContext({})

export const GlobalContext = ({ children }) => {
    const [ global, setGlobal ] = useState({initialContext})

    return <Context.Provider value={global, setGlobal}>
        {children}
    </Context.Provider>
}