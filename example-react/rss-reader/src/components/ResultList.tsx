import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId } from '../store/rss-source/types'
import SourceListItem from './SourceListItem'
import useFetch, { CachePolicies } from 'use-http'
import { convertCompilerOptionsFromJson } from 'typescript';
import axios from 'axios';
import Parser from 'rss-parser';
import ResultListItem from './ResultListItem'

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

    const [rssContent, setRssContent] = useState<Parser.Output>();
    const [refreshCount, setRefreshCount] = useState(0);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const doRefresh = useCallback(() => { setRefreshCount(refreshCount + 1); }, [refreshCount]);

    useEffect(() => {
        if (selectedSource) {
            setIsLoading(true)
            setError(undefined);
            const rssParser = new Parser();
            rssParser.parseURL(selectedSource.url)
                .then((result) => {
                    console.log(result);
                    setRssContent(result);
                })
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
                {rssContent && !isLoading && rssContent.items?.map(item => (
                    <div key={item.guid}>
                        <ResultListItem rssItem={item} isSelected={false}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default connector(ResultList)