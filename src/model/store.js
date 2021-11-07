import { createStore, combineReducers } from 'redux'
import { systemReducer } from './reducer'

// create store
const store = createStore(combineReducers({ systemReducer }))

export { store }
