import React, { useEffect, useState } from 'react';

import DateField from './DateField';
//import * as dayjs from 'dayjs'
import { default as dayjs } from 'dayjs';
import { Deadlines } from '../../store/form-doc/types';

const substractDays = (days:number) => (date:Date):Date => {
    return  dayjs(date).subtract(days, 'day').toDate();
}

const deadlinesSpec = [
    {
        name: 'master',
        label: 'Master ',
        isMaster: true,
        isLocked: false,
        value: undefined,
        computeValue : (d:Date) => d
    },
    {
        name: 'date1',
        label: 'date 1',
        isMaster: false,
        isLocked: true,
        value: undefined,
        computeValue : substractDays(1)
    },
    {
        name: 'date2',
        label: 'date 2',
        isMaster: false,
        isLocked: true,
        value: undefined,
        computeValue : substractDays(2)
    }
];

const computeDeadlines = (masterDeadline:Date):Deadlines => {
    if(!masterDeadline) {
        return { master: masterDeadline };
    }
    return deadlinesSpec.reduce( (newD:Deadlines, spec) => {
        newD[spec.name] = spec.computeValue(masterDeadline);
        return newD;
    },({ } as Deadlines));
}

const initDeadlines = (deadlines:Deadlines):Deadlines => {
    const computedDeadlines = computeDeadlines(deadlines.master);
    return deadlinesSpec.reduce( (newD:Deadlines, spec) => {
        if( ! deadlines[spec.name]) {
            newD[spec.name] = computedDeadlines[spec.name];
        } else {
            newD[spec.name] = deadlines[spec.name];
        }
        return newD;
    },({ } as Deadlines));
}
type Props = {
    values: Deadlines,
    onChange: (values: Deadlines) => void
}
const sameDate = (d1: Date, d2: Date): boolean => d1 && d2 && d1.getTime() === d2.getTime();
let count = 0;
const DeadlinesWidget: React.FC<Props> = ({ values, onChange }): JSX.Element => {
    console.log(`DeadlinesWidget ${count++}`);
    console.log(values);
    const [deadlines, setDeadlines] = useState<Deadlines>(values);
    const [computedDeadlines, setComputedDeadlines] = useState<Deadlines>(computeDeadlines(values.master));

    useEffect(() => {
        let deadlinesNeedUpdate = false;
        const newDeadlines:Deadlines =  deadlinesSpec.reduce( (newD:Deadlines, spec) => {
            if( ! deadlines[spec.name]) {
                deadlinesNeedUpdate = true;
                newD[spec.name] = computedDeadlines[spec.name];
            } else {
                newD[spec.name] = deadlines[spec.name];
            }
            return newD;
        },({ } as Deadlines));
        setComputedDeadlines(computedDeadlines);
        console.log(`deadlinesNeedUpdate : ${deadlinesNeedUpdate}`);
        if(deadlinesNeedUpdate) {
            setDeadlines(newDeadlines);
            onChange(newDeadlines);
        }
    },[]);

    const validate = (d?: Date) => {
        return (d !== undefined && d.getDay() !== 1);
    }

    const handleDateChange = (name: string, value: Date) => {
        console.log(`handleDateChange : ${name} - ${value}`)
        if (name === 'master') {
            // compute dependent dates

            const newComputedDeadlines = computeDeadlines(value);
            const newDeadlines = deadlinesSpec.reduce( (newD:Deadlines, spec) => {
                if(spec.name !== 'master') {
                    const currentValue:Date = deadlines[spec.name];
                    const currentComputedValue:Date = computedDeadlines[spec.name];
    
                    if( sameDate(currentValue, currentComputedValue)) {
                        // this deadline is sync with the master deadline
                        newD[spec.name] = newComputedDeadlines[spec.name];
                    }
                }
                return newD;
            },
            ({ } as Deadlines));
            newDeadlines.master = value;

            onChange(newDeadlines);
            setDeadlines(newDeadlines);
            setComputedDeadlines(newComputedDeadlines);
        } else {
            const newDeadlines = {
                ...deadlines,
                [name]: value
            };
            setDeadlines(newDeadlines);
            onChange(newDeadlines);
        }
    }
    return (
        <>

            {
                deadlinesSpec.map(spec => (
                    <DateField
                        name={spec.name}
                        label={spec.label}
                        value={(deadlines[spec.name] as Date)}
                        masterValue={(computedDeadlines[spec.name] as Date)}
                        onChange={handleDateChange}
                        validate={validate}
                        isMaster={ spec.name === 'master'}
                    />
                ))
            }
        </>
    )
}
export default DeadlinesWidget