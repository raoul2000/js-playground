import { RssSourceState, RssActionTypes, SELECT_RSS_SOURCE } from './types'

export const initialState: RssSourceState = {
    sources: []
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case SELECT_RSS_SOURCE:
            return state;
        default:
            return state;
    }
}