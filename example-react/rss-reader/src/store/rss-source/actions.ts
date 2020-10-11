import { RssSource, SELECT_RSS_SOURCE, RssActionTypes } from './types'

export function selectRssSource(rssSource: RssSource): RssActionTypes {
    return {
        type: SELECT_RSS_SOURCE,
        payload: {
            sourceId: rssSource.id
        }
    }
}
