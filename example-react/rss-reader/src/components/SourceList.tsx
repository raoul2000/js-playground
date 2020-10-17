import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId } from '../store/rss-source/types'
import SourceListItem from './SourceListItem'

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedRssSourceId
})
const mapDispatch = {
    select: (id: RssSourceId) => selectRssSource(id)
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const SourceList: React.FC<Props> = ({ rssSources, selectedSourceId }: Props) => {
    return (
        <div id="sourceList">
            {rssSources && rssSources.map((source) => (
                <SourceListItem
                    key={source.id}
                    source={source}
                    isSelected={source.id === selectedSourceId}
                />
            ))}
        </div>
    )
}

export default connector(SourceList)
