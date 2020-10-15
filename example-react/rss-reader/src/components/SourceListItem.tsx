import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId,RssSource } from '../store/rss-source/types'
import classNames from 'classnames';


const mapDispatch = {
    select: (id: RssSourceId) => selectRssSource(id)
}
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    source: RssSource,
    isSelected: boolean
}

const SourceListItem = (props: Props) => {
    const {source, select, isSelected } = props;
    const itemClassName = classNames({
        'source-item' : true,
        'selected': isSelected
    });
    return (
        <div
            key={source.id}
            className={itemClassName}
            onClick={() => select(source.id)}
        >
            {source.label}
        </div>
    )
}

export default connector(SourceListItem)
