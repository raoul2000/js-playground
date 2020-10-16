import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId } from '../store/rss-source/types'
import SourceListItem from './SourceListItem'
import useFetch, { CachePolicies } from 'use-http'
import { convertCompilerOptionsFromJson } from 'typescript';
import axios from 'axios';

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedRssSourceId
})
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList: React.FC<Props> = (props: Props) => {
    const { selectedSourceId, rssSources } = props;
    const selectedSource = selectedSourceId ? rssSources.find(source => source.id === selectedSourceId) : null;

    const [rssContent, setRssContent] = useState();
    const [refreshCount, setRefreshCount] = useState(0);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const doRefresh = useCallback( () => { setRefreshCount(refreshCount + 1);},[refreshCount]);

    useEffect(() => {
        if (selectedSource) {
            setIsLoading(true)
            axios
                .get(selectedSource.url)
                .then((result) => { setRssContent(result.data); })
                .catch(error => {
                    setError(error.message);
                    setRssContent(undefined);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [selectedSource, refreshCount])


    return (
        <div id="resultList">
            <div>
                Selected : {selectedSource?.label}
            </div>
            <button onClick={doRefresh}>Refresh</button>
            <div className="resultListItems">
                {isLoading && <div>Loading</div>}
                {error}
                {rssContent}
            </div>
        </div>
    )
}

export default connector(ResultList)