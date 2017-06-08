import { combineReducers } from 'redux'
import JSONPlaceholderReducer from './components/JSONPlaceholder/JSONPlaceholderReducer'

const rootReducer = combineReducers({
    JSONPlaceholderReducer: JSONPlaceholderReducer
})

export default rootReducer