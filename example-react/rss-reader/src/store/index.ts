import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { systemReducer } from './system/reducers'
import { chatReducer } from './chat/reducers'
import { rssSourceReducer } from './rss-source/reducers'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer,
    rssSource: rssSourceReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));