import { RssActionTypes, RssSource, SELECT_RSS_SOURCE  } from './types'

export function selectRssSource(rssSource: RssSource): RssActionTypes {
    return {
        type: SELECT_RSS_SOURCE,
        payload: {
            sourceId: rssSource.id
        }
    }
}
