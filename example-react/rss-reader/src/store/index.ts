import { combineReducers, createStore, Reducer } from "redux";
import { rssSourceReducer } from './rss-source/reducers'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { RssActionTypes, RssSourceState } from './rss-source/types';

export interface ApplicationState {
    rssSource: RssSourceState
}

//const rootReducer: Reducer<ApplicationState, RssActionTypes> = combineReducers({
const rootReducer = combineReducers({
    myRssSource: rssSourceReducer
})

export const store = createStore(rootReducer, devToolsEnhancer({}));
export type RootState = ReturnType<typeof rootReducer>
