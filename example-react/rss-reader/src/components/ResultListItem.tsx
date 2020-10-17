import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../store'
import { selectRssItem } from '../store/rss-source/actions'
import { RssItemId, Item } from '../store/rss-source/types'
import classNames from 'classnames';

const mapDispatch = {
    selectItem: (id?: RssItemId) => selectRssItem(id)
}

const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    rssItem: Item,
    isSelected: boolean
}

const ResultListITem: React.FC<Props> = ({ rssItem, isSelected, selectItem }: Props) => {
    const itemClassName = classNames({
        'rss-item': true,
        'selected': isSelected
    });

    return (
        <div
            className={itemClassName}
            onClick={() => selectItem(rssItem.guid)}
        >
            <small>
                {rssItem.title}
            </small>
        </div>
    )
}

export default connector(ResultListITem)
