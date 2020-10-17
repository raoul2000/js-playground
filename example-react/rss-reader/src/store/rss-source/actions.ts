import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import {
    RssActionTypes, RssSourceId, RssSource, RssDocument, SELECT_RSS_SOURCE, ADD_RSS_SOURCE, DELETE_RSS_SOURCE, SET_RSS_DOCUMENT,
    LOAD_RSS_PENDING, LOAD_RSS_SUCCESS, LOAD_RSS_ERROR
} from './types'
import Parser from 'rss-parser';

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
export function setRssDocument(rssDocument?: RssDocument): RssActionTypes {
    return {
        type: SET_RSS_DOCUMENT,
        payload: {
            rssDocument
        }
    }
}
export function setRssLoadingPending(): RssActionTypes {
    return {
        type: LOAD_RSS_PENDING,
        payload: {}
    }
}
export function setRssLoadingSuccess(): RssActionTypes {
    return {
        type: LOAD_RSS_SUCCESS,
        payload: {}
    }
}
export function setRssLoadingError(message: string): RssActionTypes {
    return {
        type: LOAD_RSS_ERROR,
        payload: {
            message
        }
    }
}
/**
 * Load an RSS Source and store it as a RssDocument object.
 * The URL of the RSS Source is used to perform an HTTP/GET request. The response is then
 * parsed as a RssDocument object and stored. 
 * 
 * This *thunk* action will update the `readStatus` property to reflect request progress.
 * 
 * @param rssSource the RSS source to load
 */
export function loadRssDocument(rssSource: RssSource): ThunkAction<void, {}, {}, AnyAction> {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {

        dispatch(setRssLoadingPending());
        const rssParser = new Parser();
        rssParser.parseURL(rssSource.url)
            .then((result) => {
                dispatch(setRssLoadingSuccess());
                dispatch(setRssDocument(result));
            })
            .catch(error => {
                dispatch(setRssLoadingError(error.message));
                dispatch(setRssDocument());
            })
    }
}
