import React from 'react';
import { GroupedList, GroupHeader, IGroupHeaderProps, IGroupHeaderCheckboxProps } from 'office-ui-fabric-react/lib/GroupedList';
import { CheckboxVisibility, DetailsList, IColumn, DetailsRow, IGroupRenderProps, IGroupedListStyles, IDetailsRowStyles, IDetailsRowCheckProps
, IDetailsCheckboxProps } from 'office-ui-fabric-react/lib/DetailsList';
import {IRenderFunction} from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
    textOverflow: 'ellipsis'
});

interface IExampleItem {
    name: string;
};

const groupedListStyles: IGroupedListStyles = {
    root: {
        backgroundColor: "red"
    },
    group: {},
    groupIsDropping: {}
};

const listItems: Array<IExampleItem> = [
    {
        name: "bob lorem ipsum long textbob lorem ipsum long textbob lorem ipsum long text"
    },
    {
        name: "alice"
    },
    {
        name: "Aflred"
    },
    {
        name: "Théodore"
    }
]

const columns: Array<IColumn> = [
    {
        key: "name",
        name: "the name",
        minWidth: 200,
        maxWidth: 200,

        fieldName: "name"
    }
];

const groups = [
    { key: 'group_1', name: 'group 1', startIndex: 0, count: 2, level: 0 },
    { key: 'group_2', name: 'group 2', startIndex: 2, count: 2, level: 0 },
]
const groupProps: IGroupRenderProps = {
    onRenderHeader: (props?: IGroupHeaderProps): JSX.Element => (
        <GroupHeader onRenderGroupHeaderCheckbox={onRenderGroupHeaderCheckbox} {...props} />
    ),
};
const onRenderGroupHeaderCheckbox = (props?: IGroupHeaderCheckboxProps) => (
    <div>A</div>
);
const onRenderDatilRowCheck = (props: IDetailsRowCheckProps) => ( <div />)
const onRenderDetailsCheckbox: IRenderFunction<IDetailsCheckboxProps> = () => (<div>X</div>);

const onRenderCell = (nestingDepth?: number, item?: IExampleItem, itemIndex?: number): React.ReactNode => {
    console.log(`onRenderCell : ${item}`);
    return item && typeof itemIndex === 'number' && itemIndex > -1 ? (
        <div>
            <DetailsRow
                columns={columns}
                groupNestingDepth={nestingDepth}
                item={item}
                itemIndex={itemIndex}
            />
        </div>
    ) : null;
};

export const LeftBar: React.FunctionComponent = () => {
    return (
        <GroupedList
            items={listItems}
            groups={groups}
            onRenderCell={onRenderCell}
            compact={true}
            styles={groupedListStyles}
        />
    );
}