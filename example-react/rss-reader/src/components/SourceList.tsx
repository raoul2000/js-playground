import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RssSource, RssSourceId, RssSourceState } from '../store/rss-source/types'


const mapState = (state: RssSourceState) => ({
    rssSources: state.rssSources,
    selectedSourceId: state.selectedRssSource
})
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux 

const SourceList = (props:Props ) => {
    return (
        <div id="sourceList">
            {props.rssSources.map((source) => (
                <div key={source.id} className={source.id === props.selectedSourceId ? 'selected' : undefined}>
                    {source.label}
                </div>
            ))}
        </div>
    )
}

export default connector(SourceList)
