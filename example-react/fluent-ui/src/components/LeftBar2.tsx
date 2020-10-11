import * as React from 'react';
import { GroupedList, IGroup, IGroupHeaderProps, IGroupFooterProps } from 'office-ui-fabric-react/lib/GroupedList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { getTheme, mergeStyleSets, IRawStyle } from 'office-ui-fabric-react/lib/Styling';

interface IExampleItem {
    name:string
};

const theme = getTheme();
const headerAndFooterStyles: IRawStyle = {
    minWidth: 300,
    minHeight: 40,
    lineHeight: 40,
    paddingLeft: 16,
};
const classNames = mergeStyleSets({
    header: [headerAndFooterStyles, theme.fonts.xLarge],
    footer: [headerAndFooterStyles, theme.fonts.large],
    name: {
        display: 'inline-block',
        overflow: 'hidden',
        height: 24,
        cursor: 'default',
        padding: 8,
        boxSizing: 'border-box',
        verticalAlign: 'top',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        paddingLeft: 32,
        textOverflow: "ellipsis"
    },
});

const onRenderHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
    if (props) {
        const toggleCollapse = (): void => {
            props.onToggleCollapse!(props.group!);
        };
        return (
            <div className={classNames.header}>
                {props.expandButtonProps}
                <Link
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={toggleCollapse}
                >
                    {props.group!.name}
                </Link>
            </div>
        );
    }

    return null;
};

const onRenderCell = (nestingDepth?: number, item?: IExampleItem, itemIndex?: number): React.ReactNode => {
    return item ? (
        <div role="row" data-selection-index={itemIndex}>
            <span role="cell" className={classNames.name}>
                {item.name}
            </span>
        </div>
    ) : null;
};

const groupedListProps = {
    onRenderHeader
};
const items: IExampleItem[] = [
    {
        name: "Alice was here"
    },
    {
        name: "Bob"
    },
    {
        name: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut adipisci illo similique molestias dolores optio in ducimus exercitationem, commodi, sit laudantium! Necessitatibus eligendi impedit accusantium corporis mollitia illo tempore consequatur?"
    }
];

const groups: IGroup[] = [
    {
        count:1,
        key: "group1",
        name: "Group 1",
        startIndex: 0,
    },
    {
        count:2,
        key: "group2",
        name: "Group 2",
        startIndex: 1,
    }
];

export const LeftBar: React.FunctionComponent = () => (
    <GroupedList items={items} onRenderCell={onRenderCell} groupProps={groupedListProps} groups={groups} />
);
