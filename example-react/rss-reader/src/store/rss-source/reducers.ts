import {SELECT_RSS_SOURCE, RssActionTypes, RssSourceState } from './types'

export const initialState: RssSourceState = {
    sources: [
        {
            id: "id",
            label: "source label",
            url: "url"
        }
    ]
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case SELECT_RSS_SOURCE:
            return {
                sources: [...state.sources]
            }
        default:
            return state;
    }
}