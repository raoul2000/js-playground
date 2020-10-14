import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { systemReducer } from './system/reducers'
import { chatReducer } from './chat/reducers'

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeEnhancers());
