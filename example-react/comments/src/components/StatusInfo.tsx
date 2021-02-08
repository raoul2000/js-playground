import React from 'react';
import { useStore } from '../store';

export const StatusInfo: React.FC<{}> = ():JSX.Element => {
    /* const [operation, uiStatus] = useStore(state => [state.operation, state.uiStatus]);
    return ( 
        <div>
            status = {uiStatus} - op = {operation}
        </div>
    ); */
    return (<div>status</div>)
}