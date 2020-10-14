import React from 'react';
import { RssSource } from '../store/rss-source/types'
import MyComponent from './MyComponent';

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
];


const selectedSourceId = 'une-inter';

export const SourceList = () => {
    return (
        <div id="sourceList">
            <MyComponent backgroundColor="red"/>
            {sources.map((source) => (
                <div key={source.id} className={source.id === selectedSourceId ? 'selected' : undefined}>
                    {source.label}
                </div>
            ))}
        </div>
    )
}
