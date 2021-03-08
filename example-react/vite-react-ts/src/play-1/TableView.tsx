import React from "react";
import { TableDataType } from "./data";
import useStickyHeader from "./useStickyHeader";
import "./style.scss";

type Props = {
    headers: string[];
    data: TableDataType[];
};
export const TableView: React.FC<Props> = ({ headers, data }): JSX.Element => {
    const { tableRef, isSticky } = useStickyHeader();

    const renderHeader = () => (
        <thead>
            <tr>
                <th>country</th>
                <th>code</th>
                <th>area</th>
                <th>flag</th>
            </tr>
        </thead>
    );

    return (
        <div className="table-container">
            {isSticky && (
                /*
                .sticky will be the copy of table header while sticky 
                needed as otherwise table won't preserve columns width
                */
                <table
                    className="sticky"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    {renderHeader()}
                </table>
            )}
            <table ref={tableRef}>
                {renderHeader()}
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.country}</td>
                            <td>{item.code}</td>
                            <td>{item.area}</td>
                            <td>{item.flag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
