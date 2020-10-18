import Parser from 'rss-parser';
import { RssDocument, Item } from '../store/rss-source/types'

const normalizeRssIem = (item: Parser.Item): Item => ({
    id: item.guid || item.id,
    title: item.title,
    content: item.content,
    link: item.link,
    pubDate: item.pubDate
})

const normalizeRssItems = (items?: Parser.Item[]): Item[] => {
    if (!items || !Array.isArray(items)) {
        return [];
    }
    return items
        .map(normalizeRssIem)
        .filter(item => item)
}

export const normalizeRssDocument = (doc: Parser.Output): RssDocument => ({
    title: doc.title,
    items: normalizeRssItems(doc.items)
})

export const fetchRssDocument = (url: string): Promise<RssDocument> => {
    const rssParser = new Parser();
    return rssParser.parseURL(url)
        .then(normalizeRssDocument)
}