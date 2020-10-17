import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { getRssItemById } from '../store/rss-source/reducers'


const mapState = (state: RootState) => ({
    rssItem: getRssItemById(state.rssSource)
})

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

export const ResultDetail: React.FC<Props> = ({ rssItem }: Props) => {

    return (
        <div id="resultDetail">
            {rssItem &&
                <article>
                    <h1>{rssItem.title}</h1>
                    <p>{rssItem.content}</p>
                    <footer>
                        <a href={rssItem.link} target="_blank" rel="noopener noreferrer">lire ...</a> | <span>{rssItem.pubDate}</span>
                    </footer>
                </article>
            }
        </div>
    )
}

export default connector(ResultDetail)