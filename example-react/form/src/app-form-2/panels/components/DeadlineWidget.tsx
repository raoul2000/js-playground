import React, { useState } from 'react';

import DateField from './DateField';


const DeadlineWidget: React.FC<{}> = (): JSX.Element => {
    const [deadlines, setDeadlines] = useState<Date[]>([]);

    return (
        <div>wip</div>
    )
}
export default DeadlineWidget