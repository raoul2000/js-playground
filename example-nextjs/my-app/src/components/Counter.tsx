"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";

type Props = {
    label?: string;
};

export const Counter: React.FC<Props> = ({
    label = "count",
}): React.JSX.Element => {
    const [count, setCount] = useState(0);
    return (
        <div className="p-8">
            <div className="shadow-2 surface-card p-4 border-round flex justify-content-center">
                <Button
                    icon="pi pi-check"
                    label={`${label} = ${count}`}
                    onClick={(ev) => setCount(count + 1)}
                ></Button>
            </div>
        </div>
    );
};
