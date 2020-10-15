import { RssSourceState, RssActionTypes, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE } from './types'

export const initialState: RssSourceState = {
    rssSources: [],
    selectedRssSourceId: undefined,
    readStatus: undefined
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case SELECT_RSS_SOURCE:
            return {
                ...state,
                selectedRssSourceId: action.payload.id
            }
        case ADD_RSS_SOURCE:
            return {
                ...state,
                rssSources: [...state.rssSources, action.payload.rssSource]
            }
        case DELETE_RSS_SOURCE:
            return {
                ...state,
                rssSources: state.rssSources.filter(
                    source => source.id !== action.payload.id
                )
            }            
        default:
            return state;
    }
}