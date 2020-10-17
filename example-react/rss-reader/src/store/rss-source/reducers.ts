import { RssSourceState, RssActionTypes, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, RssReadStatus } from './types'

export const initialState: RssSourceState = {
    rssSources: [],
    selectedRssSourceId: undefined,
    readStatus: undefined, 
    readErrorMessage: undefined,
    rssDocument: undefined
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
        case SET_RSS_DOCUMENT:
            return {
                ...state,
                rssDocument: action.payload.rssDocument
            }          
        case LOAD_RSS_PENDING:
            return {
                ...state,
                readStatus: RssReadStatus.PENDING,
                readErrorMessage: undefined
            }  
        case LOAD_RSS_SUCCESS:
            return {
                ...state,
                readStatus: RssReadStatus.SUCCESS
            }  
        case LOAD_RSS_ERROR:
            return {
                ...state,
                readStatus: RssReadStatus.ERROR,
                readErrorMessage: action.payload.message
            }  
        default:
            return state;
    }
}