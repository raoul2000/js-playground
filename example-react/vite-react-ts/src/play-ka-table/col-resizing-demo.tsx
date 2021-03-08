import React, { useState } from "react";

import { ITableProps, kaReducer, Table } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import { Column } from "ka-table/models";
import { DispatchFunc } from "ka-table/types";
import "./style.scss";

const columns: Column[] = Array(5)
    .fill(undefined)
    .map((_, index) => ({
        key: "column" + index,
        style: { width: 150, minWidth: 100 },
        title: "Column " + index,
        type: DataType.String,
        isResizable: true
    }));

const dataArray = Array(30)
    .fill(undefined)
    .map((_, index) =>
        columns.reduce(
            (previousValue: any, currentValue) => {
                previousValue[
                    currentValue.key
                ] = `${currentValue.key} row:${index}`;
                return previousValue;
            },
            { id: index }
        )
    );

const tablePropsInit: ITableProps = {
    columns,
    columnResizing: true,
    data: dataArray,
    rowKeyField: "id",
    sortingMode: SortingMode.Single,
    width:'200px'
};

const ColumnResizingDemo: React.FC = () => {
    const [tableProps, changeTableProps] = useState(tablePropsInit);
    const dispatch: DispatchFunc = (action) => {
        changeTableProps((prevState: ITableProps) =>
            kaReducer(prevState, action)
        );
    };

    return (
        <div className="column-resizing-demo">
            <Table {...tableProps} dispatch={dispatch} />
        </div>
    );
};

export default ColumnResizingDemo;
