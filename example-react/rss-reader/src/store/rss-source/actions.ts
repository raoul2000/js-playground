import { RssActionTypes, RssSourceId, RssSource, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE } from './types'

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
