import React from "react";
import { tableData, tableHeaders } from "./data";
import { TableView } from "./TableView";

// from https://webup.org/blog/sticky-header-table-with-react-hooks/#sticky-header-code-solution
export const Play1: React.FC<{}> = (): JSX.Element => (
    <TableView headers={tableHeaders} data={tableData} />
);
