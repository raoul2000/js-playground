import React from 'react';
import { RssSource } from '../store/rss-source/types'

const sources: Array<RssSource> = [
    {
        id: 'une-inter',
        label: 'La Une International',
        url: 'https://www.lemonde.fr/international/rss_full.xml'
    },
    {
        id: 'une-fr',
        label: 'La Une France',
        url: 'https://www.lemonde.fr/rss/une.xml'
    }
]
export const SourceList: React.FunctionComponent = () => {
    return (
        <div id="sourceList">
            {sources.map((source) => (
                <div key={source.id}>
                    {source.label}
                </div>
            ))}
        </div>
    )
}