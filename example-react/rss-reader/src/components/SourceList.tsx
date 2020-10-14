import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import {RootState} from '../store';


const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedRssSource
})
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux 

const SourceList = (props:Props) => {
    return (
        <div id="sourceList">
            {props.rssSources && props.rssSources.map((source) => (
                <div key={source.id} className={source.id === props.selectedSourceId ? 'selected' : undefined}>
                    {source.label}
                </div>
            ))}
        </div>
    )
}

export default connector(SourceList)
