import { Action } from 'redux';

export const ADD_RSS_SOURCE = "@rssSource/ADD_RSS_SOURCE";
export const SELECT_RSS_SOURCE = "@rssSource/SELECT_RSS_SOURCE";
export const DELETE_RSS_SOURCE = "@rssSource/DELETE_RSS_SOURCE";
export const LOAD_RSS_PENDING = "@rssSource/LOAD_RSS_PENDING";
export const LOAD_RSS_SUCCESS = "@rssSource/LOAD_RSS_SUCCESS";
export const LOAD_RSS_ERROR = "@rssSource/LOAD_RSS_ERROR";

export const LOAD_RSS_DOCUMENT = "@rssSource/LOAD_RSS_DOCUMENT";
export const SET_RSS_DOCUMENT = "@rssSource/SET_RSS_DOCUMENT";
export const SELECT_RSS_ITEM = "@rssSource/SELECT_RSS_ITEM";

export type RssSourceId = string;
export type RssItemId = string;

export interface RssSource {
    /**
     * ID of the RSS source
     */
    id: RssSourceId
    /**
     * Source name displayed to the user
     */
    label: string
    /**
     * URL of the RSS feed for this source
     */
    url: string
}
/**
 * The status of the RSS read operation
 */
export enum RssReadStatus {
    /**
     * The RSS source is about to be read
     */
    PENDING = "PENDING",
    /**
     * The RSS source was read successfully
     */
    SUCCESS = "SUCCESS",
    /**
     * The RSS source read operation ended up in error
     */
    ERROR = "ERROR"
}
/**
 * Represent an entry in the RSS Document article list 
 */
export interface Item {
    id: string;
    title?: string;
    content?: string;
    link?: string;
    pubDate?: string;
}
/**
 * Represent the parsed verison of an RSS source
 */
export interface RssDocument {
    title?: string;
    items: Item[];
}

export interface RssSourceState {
    /**
     * The list of RSS sources currently loaded in the app. 
     */
    rssSources: Array<RssSource>;
    /**
     * Id of the selected RSS source. 
     * 
     * This property is `undefined` when no RSS source is selected, otherwise it 
     * contains the ID of the selected RSS Source
     */
    selectedRssSourceId: RssSourceId | undefined
    /**
     * Describes the status of the latest RSS read operation
     * performed on the source with ID equal to `selectedRssSourceId`. 
     */
    readStatus: RssReadStatus | undefined
    /**
     * RSS document for the selected source or `undefined` when no RSS source is selected
     * or the selected RSS source has not been fetched
     */
    rssDocument: RssDocument | undefined
    /**
     * Contains the message when the read operation ends in error
     */
    readErrorMessage: string | undefined
    /**
     * Id of the RSS item currently selected or `undefined` if no RSS item is selected
     */
    selectedRssItemId: RssItemId | undefined
}
interface SelectRssSourceAction extends Action {
    type: typeof SELECT_RSS_SOURCE,
    payload: {
        id: RssSourceId
    }
}
interface AddRssSourceAction extends Action {
    type: typeof ADD_RSS_SOURCE,
    payload: {
        rssSource: RssSource
    }
}
interface DeleteRssSourceAction extends Action {
    type: typeof DELETE_RSS_SOURCE,
    payload: {
        id: RssSourceId
    }
}
interface SetRssDocumentAction extends Action {
    type: typeof SET_RSS_DOCUMENT,
    payload: {
        rssDocument: RssDocument | undefined
    }
}
interface setRssLoadingPendingAction extends Action {
    type: typeof LOAD_RSS_PENDING,
    payload: {}
}
interface setRssLoadingSuccessAction extends Action {
    type: typeof LOAD_RSS_SUCCESS,
    payload: {}
}
interface setRssLoadingErrorAction extends Action {
    type: typeof LOAD_RSS_ERROR,
    payload: {
        message: string
    }
}
interface LoadRssSocumentAction extends Action {
    type: typeof LOAD_RSS_DOCUMENT,
    payload: {
        rssSource: RssSource
    }
}
interface SelectRssItemAction extends Action {
    type: typeof SELECT_RSS_ITEM,
    payload: {
        id?: RssItemId
    }
}
export type RssActionTypes = SelectRssSourceAction | AddRssSourceAction | DeleteRssSourceAction | SetRssDocumentAction | LoadRssSocumentAction
    | setRssLoadingPendingAction | setRssLoadingSuccessAction | setRssLoadingErrorAction | SelectRssItemAction;