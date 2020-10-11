import { combineReducers, createStore } from "redux";
import { rssSourceReducer } from './rss-source/reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    rssSource: rssSourceReducer
})

export const store = createStore(rootReducer, devToolsEnhancer({}));
export type RootState = ReturnType<typeof rootReducer>
