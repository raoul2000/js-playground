import {
    RssSourceState, RssActionTypes, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR, SELECT_RSS_ITEM, RssReadStatus, RssSourceId
} from './types'

export const initialState: RssSourceState = {
    rssSources: [],
    selectedRssSourceId: undefined,
    readStatus: undefined,
    readErrorMessage: undefined,
    rssDocument: undefined,
    selectedRssItemId: undefined
}

export function rssSourceReducer(
    state = initialState,
    action: RssActionTypes
): RssSourceState {
    switch (action.type) {
        case SELECT_RSS_SOURCE:
            const isNewSelection = action.payload.id !== state.selectedRssSourceId
            if (isNewSelection) {
                return {
                    ...state,
                    selectedRssSourceId: action.payload.id,
                    selectedRssItemId: undefined
                }
            } else {
                return state
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
                readErrorMessage: action.payload.message,
                selectedRssItemId: undefined
            }
        case SELECT_RSS_ITEM:
            return {
                ...state,
                selectedRssItemId: action.payload.id
            }
        default:
            return state;
    }
}

// Selectors ////////////////////////////////////////////////////////////////////////////////////////////
export const getSelectedRssSource = (state:RssSourceState) => {
    const { rssSources, selectedRssSourceId } = state;
    if (rssSources && selectedRssSourceId) {
        return getRssSourceById(state, selectedRssSourceId);
    }
    return null;

}
export const getRssSourceById = (state: RssSourceState, sourceId: RssSourceId) => {
    const { rssSources } = state;
    if (rssSources && sourceId) {
        return rssSources.find(source => source.id === sourceId);
    }
    return null;
}
export const getRssItemById = (state: RssSourceState) => {
    const { rssDocument, selectedRssItemId } = state;
    if (rssDocument && rssDocument.items && selectedRssItemId) {
        return rssDocument.items.find(item => item.id === selectedRssItemId)
    }
    return null;
} 