import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { loadRssDocument } from '../store/rss-source/actions'
import { getSelectedRssSource } from '../store/rss-source/reducers'
import { RssSource, RssReadStatus } from '../store/rss-source/types'
import ResultListItem from './ResultListItem'

const mapState = (state: RootState) => ({
    selectedSourceId: state.rssSource.selectedRssSourceId,
    selectedSource: getSelectedRssSource(state.rssSource),
    rssDocument: state.rssSource.rssDocument,
    rssLoadingStatus: state.rssSource.readStatus,
    rssLoadErrorMessage: state.rssSource.readErrorMessage,
    selectedItemId: state.rssSource.selectedRssItemId
})
const mapDispatch = {
    loadRss: (rssSource: RssSource) => loadRssDocument(rssSource)
}
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList: React.FC<Props> = (props: Props) => {
    const { selectedSourceId, selectedSource, rssDocument, rssLoadingStatus, rssLoadErrorMessage, loadRss, selectedItemId } = props;

    /**
     * Trigger the loadRss Action
     */
    const handleLoadRssDocument = () => {
        if (selectedSource) {
            loadRss(selectedSource);
        }
    };
    // load RSS Document each time the selected RSS source Id changes
    useEffect(handleLoadRssDocument, [selectedSourceId])
    console.log(rssDocument);
    return (
        <div id="resultList">
            <h3>
                {selectedSource?.label}
            </h3>
            <button onClick={() => handleLoadRssDocument()}>Refresh</button>
            <div className="resultListItems">
                {rssLoadingStatus === RssReadStatus.PENDING && <div>loading ...</div>}
                {rssLoadingStatus === RssReadStatus.ERROR && <div>{rssLoadErrorMessage}</div>}
                {rssDocument && rssDocument.items?.map(item => (
                    <ResultListItem key={item.id} rssItem={item} isSelected={selectedItemId === item.id} />
                ))}
            </div>
        </div>
    )
}

export default connector(ResultList)