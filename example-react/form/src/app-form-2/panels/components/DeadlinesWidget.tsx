import React, { useState } from 'react';

import DateField from './DateField';

export interface Deadlines {
    date0?: Date,
    date1?: Date,
    date2?: Date
};
const deadlinesSpec = [
    {
        name: 'date0',
        isMaster: true,
        isLocked: false,
        value: undefined
    },
    {
        name: 'date1',
        isMaster: false,
        isLocked: true,
        value: undefined 
    },
    {
        name: 'date2',
        isMaster: false,
        isLocked: true,
        value: undefined 
    }
];


type Props = {
    values: Deadlines,
    onChange: (values:Deadlines) => void
}
const sameDate = (d1:Date, d2:Date):boolean => d1.getTime() === d2.getTime();

const DeadlinesWidget: React.FC<Props> = ({ values, onChange }): JSX.Element => {
    const [deadlines, setDeadlines] = useState<Deadlines>(values);
    
    const validate = (d?: Date) => {
        return (d !== undefined && d.getDay() !== 1);
    }

    const handleDateChange = (name:string, value:Date) => {
        console.log(`handleDateChange : ${name} - ${value}`)
        if(name === 'date0') {
            // compute dependent dates
            const newDeadlines = {
                date0: value,
                date1: new Date(),
                date2: deadlines.date2
            };
            onChange(newDeadlines);
            setDeadlines(newDeadlines);
        } else {
            const newDeadlines = {
                ...deadlines,
                [name] : value
            };
            onChange(newDeadlines);
            setDeadlines(newDeadlines);            
        }
    }
    return (
        <>
            <DateField
                name="date0"
                label="date 0"
                value={deadlines.date0}
                onChange={handleDateChange}
                isMaster={true}
                validate={validate}
            />
            <DateField
                name="date1"
                label="date 1"
                value={deadlines.date1}
                masterValue={deadlines.date0}
                onChange={handleDateChange}
                validate={validate}
            />
            <DateField
                name="date2"
                label="Date 2"
                value={deadlines.date2}
                masterValue={deadlines.date0}
                onChange={handleDateChange}
                validate={validate}
            />
        </>
    )
}
export default DeadlinesWidget