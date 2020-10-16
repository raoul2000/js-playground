import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId, RssSource } from '../store/rss-source/types'
import classNames from 'classnames';
import Parser from 'rss-parser';

const mapDispatch = {
    select: (id: RssSourceId) => selectRssSource(id)
}
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = {
    rssItem:Parser.Output,
    isSelected:boolean
}

const ResultListITem: React.FC<Props> = (props: Props) => {
    const { rssItem, isSelected } = props;

    return (
        <div>
            {rssItem.title}
        </div>
    )
}

export default connector(ResultListITem)
