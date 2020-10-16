import { RssActionTypes, RssSourceId, RssSource, RssDocument, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT } from './types'

export function selectRssSource(id: RssSourceId): RssActionTypes {
    return {
        type: SELECT_RSS_SOURCE,
        payload: {
            id
        }
    }
}

export function addRssSource(source: RssSource): RssActionTypes {
    return {
        type: ADD_RSS_SOURCE,
        payload: {
            rssSource: source
        }
    }
}

export function deleteRssSource(id: RssSourceId): RssActionTypes {
    return {
        type: DELETE_RSS_SOURCE,
        payload: {
            id
        }
    }
}

export function setRssDocument(rssDocument: RssDocument): RssActionTypes {
    return {
        type: SET_RSS_DOCUMENT,
        payload: {
            rssDocument
        }
    }
}
