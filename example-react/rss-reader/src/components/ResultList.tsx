import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { loadRssDocument } from '../store/rss-source/actions'
import { RssSource } from '../store/rss-source/types'
import ResultListItem from './ResultListItem'

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedRssSourceId,
    rssDocument: state.rssSource.rssDocument,
    rssLoadingStatus: state.rssSource.readStatus,
    rssLoadErrorMessage: state.rssSource.readErrorMessage
})
const mapDispatch = {
    loadRss: (rssSource: RssSource) => loadRssDocument(rssSource)
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList: React.FC<Props> = (props: Props) => {
    const { selectedSourceId, rssSources, rssDocument, rssLoadingStatus, rssLoadErrorMessage, loadRss } = props;
    const selectedSource = selectedSourceId ? rssSources.find(source => source.id === selectedSourceId) : null;

    /**
     * Trigger the loadRss Action
     */
    const handleLoadRssDocument = () => {
        if (selectedSource) {
            loadRss(selectedSource);
        }
    };
    // load RSS Document eahc time the selected RSS source Id changes
    useEffect(handleLoadRssDocument, [selectedSourceId])

    return (
        <div id="resultList">
            <div>
                Selected : {selectedSource?.label}
            </div>
            <button onClick={() => handleLoadRssDocument()}>Refresh</button>
            <div className="resultListItems">
                {rssLoadingStatus}
                {rssDocument && rssDocument.title}
                {rssLoadErrorMessage}
                {rssDocument && rssDocument.items?.map(item => (
                    <div key={item.guid}>
                        <ResultListItem rssItem={item} isSelected={false} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default connector(ResultList)