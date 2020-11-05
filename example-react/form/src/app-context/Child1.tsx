import React from 'react';

type Props = {
    name:string;
}

let renderCount: number = 0;
const Child1: React.FC<Props> = ({name}:Props) => {
    renderCount++;
    return (
        <div style={{ backgroundColor: "green", padding: '1em' }}>
            <div>child 1 ({renderCount})</div>
            <div>{name}</div>
        </div>
    )
}

export default Child1;