import { Action } from 'redux';

export const ADD_RSS_SOURCE = "@rssSource/ADD_RSS_SOURCE";
export const SELECT_RSS_SOURCE = "@rssSource/SELECT_RSS_SOURCE";
export const DELETE_RSS_SOURCE = "@rssSource/DELETE_RSS_SOURCE";
export const READ_RSS_PENDING = "@rssSource/READ_RSS_PENDING";
export const READ_RSS_SUCCESS = "@rssSource/READ_RSS_SUCCESS";
export const READ_RSS_ERROR = "@rssSource/READ_RSS_ERROR";

export type RssSourceId = string;

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
export enum RssReadStatus  {
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

export interface RssSourceState {
    /**
     * The list of RSS sources currently loaded in the app. 
     */
    rssSources: Array<RssSource>;
    /**
     * The currently selected RSS source. 
     * 
     * This property is `undefined` when no RSS source is selected, otherwise it 
     * contains the ID of an RSS Source
     */
    selectedRssSourceId: RssSourceId | undefined
    /**
     * Describes the status of the latest RSS read operation
     * performed on the source with ID equal to `selectedRssSourceId`. 
     */
    readStatus: RssReadStatus | undefined
}

interface SelectRssSourceAction extends Action{
    type: typeof SELECT_RSS_SOURCE,
    payload: {
        id: RssSourceId
    }
}

interface AddRssSourceAction extends Action{
    type: typeof ADD_RSS_SOURCE,
    payload: {
        rssSource: RssSource
    }
}

interface DeleteRssSourceAction extends Action{
    type: typeof DELETE_RSS_SOURCE,
    payload: {
        id: RssSourceId
    }
}

export type RssActionTypes = SelectRssSourceAction | AddRssSourceAction | DeleteRssSourceAction;