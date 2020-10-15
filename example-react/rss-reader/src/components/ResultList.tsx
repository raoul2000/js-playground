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
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList:  React.FC<Props> = (props: Props) => {
    const {selectedSourceId, rssSources} = props;
    const selectedSource = rssSources.find( source => source.id === selectedSourceId);

    return (
        <div id="resultList">
            ResultList : {selectedSource?.label}
        </div>
    )
}

export default connector(ResultList)