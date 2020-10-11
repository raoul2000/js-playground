export const SELECT_RSS_SOURCE = "SELECT_RSS_SOURCE";

export interface RssSource {
    id: string
    label: string
    url: string
}

export interface RssSourceState {
    sources: Array<RssSource>;
}

interface SelectRssAction {
    type: typeof SELECT_RSS_SOURCE,
    payload: {
        sourceId: string
    }
}

export type RssActionTypes = SelectRssAction