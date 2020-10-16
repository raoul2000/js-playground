import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId } from '../store/rss-source/types'
import SourceListItem from './SourceListItem'
import useFetch, { CachePolicies } from 'use-http'
import { convertCompilerOptionsFromJson } from 'typescript';

const mapState = (state: RootState) => ({
    rssSources: state.rssSource.rssSources,
    selectedSourceId: state.rssSource.selectedRssSourceId
})
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const ResultList: React.FC<Props> = (props: Props) => {
    const { selectedSourceId, rssSources } = props;
    const selectedSource = rssSources.find(source => source.id === selectedSourceId);

    const [rssContent, setRssContent] = useState()
    const { get, response, loading, error } = useFetch(selectedSource && selectedSource.url, {
        cachePolicy:CachePolicies.NO_CACHE
    });

    async function loadRssContent() {
        const xmlRssContent = await get()
        if (response.ok) {
            console.log(xmlRssContent);
            setRssContent(xmlRssContent)
        }
    }

    useEffect(() => {
        if(selectedSource) {
            loadRssContent()
        }
    }, [selectedSource]) // componentDidMount

    return (
        <div id="resultList">
            <div>
                Selected : {selectedSource?.label}
            </div>
            <div className="resultListItems">
                {loading && <div>Loading...</div>}
                {error && selectedSource && <div>{error.message}</div>}
                {!error && rssContent}
            </div>
        </div>
    )
}

export default connector(ResultList)