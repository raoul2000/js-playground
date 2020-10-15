import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId } from '../store/rss-source/types'
import SourceListItem from './SourceListItem'
import { useLazyAxios } from 'use-axios-client';

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

    const [getData, { data, error, loading }] = useLazyAxios<string>({
        method: 'GET',
        url: 'http://localhost:3000/test-response/une.xml'
    });
    useEffect(() => {
        if(selectedSource) {
            getData()
                .then(() => {console.log(data)})
        }
    }, [selectedSourceId])

    return (
        <div id="resultList">
            ResultList : {selectedSource?.label}
            {data && <div>{data}</div>}
        </div>
    )
}

export default connector(ResultList)