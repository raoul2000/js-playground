import { Action } from 'redux';

export const ADD_RSS_SOURCE = "@rssSource/ADD_RSS_SOURCE";
export const SELECT_RSS_SOURCE = "@rssSource/SELECT_RSS_SOURCE";
export const DELETE_RSS_SOURCE = "@rssSource/DELETE_RSS_SOURCE";

export type RssSourceId = string;

export interface RssSource {
    id: RssSourceId
    label: string
    url: string
}

export interface RssSourceState {
    rssSources: Array<RssSource>;
    selectedRssSource: RssSourceId
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