import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { selectRssSource } from '../store/rss-source/actions'
import { RssSourceId, RssSource } from '../store/rss-source/types'
import classNames from 'classnames';


const mapDispatch = {
    selectSource: (id: RssSourceId) => selectRssSource(id)
}
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    source: RssSource,
    isSelected: boolean
}

const SourceListItem: React.FC<Props> = ({ source, selectSource, isSelected }: Props) => {

    const handleClickOnRssSource = () => {
        selectSource(source.id);
    };

    const itemClassName = classNames({
        'source-item': true,
        'selected': isSelected
    });
    return (
        <div
            key={source.id}
            className={itemClassName}
            onClick={handleClickOnRssSource}
        >
            {source.label}
        </div>
    )
}

export default connector(SourceListItem)
