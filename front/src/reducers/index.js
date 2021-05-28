import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
    question: questionsReducer
})

export default rootReducer