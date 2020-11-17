import React, { useEffect, useState } from 'react'

import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

// Component definition --------------------- 

type Props = {
    name: string
    label: string
    value?: Date
    masterValue?: Date
    isMaster?: boolean
    onChange: (name: string, value: Date) => void
}
type CalendarChangeEvent = { originalEvent: Event, value: Date | Date[], target: { name: string, id: string, value: Date | Date[] } };

const DateField: React.FC<Props> = ({ onChange, name, label, value, masterValue, isMaster = false }): JSX.Element => {

    const [locked, setLocked] = useState<boolean>(!isMaster && (masterValue === undefined || masterValue?.getTime() === value?.getTime()));
    console.log(`input : ${name} - locked = ${locked} - isMaster = ${isMaster} - masterValue = ${masterValue} - value = ${value}`)
    console.log( masterValue?.getTime())
    console.log(  value?.getTime())
    /*     const textInput = useRef<HTMLElement>();
        const [localValue, setLocalValue] = useState<Date>();
    
        useEffect(() => {
            setLocalValue(value)
        }, [value]); */

    // when user selects a date from the calendar and close it, no blur event is fired
    // Actually blur event is fired only when the input text field looses focus, which is the 
    // case when the date is selected from the calendar layer. If several date are selected successively
    // from the cal layer, no blur event => no way to update the value
    const handleDateChange = (e: CalendarChangeEvent) => {
        const d: Date = Array.isArray(e.value) ? e.value[0] : e.value;
        if (d) {
            console.log('cal change', d)
            d.setSeconds(0);
            d.setMilliseconds(0);
            onChange(name, d);
        }
    }
    const toggleLock = () => {
        setLocked(!locked);
        onChange(name, masterValue || new Date())
    }
    return (
        <div className="p-field p-grid">
            <label htmlFor={name} className="p-col-fixed" style={{ minWidth: '100px' }}>{label}:</label>
            <div className="p-col" style={{ maxWidth: '200px' }}>
                <div className="p-inputgroup">
                    {!isMaster
                        && <Button icon={`pi ${locked ? 'pi-lock' : 'pi-unlock'}`} className="p-button-secondary" onClick={() => toggleLock()} />
                    }
                    {locked
                        ? <InputText
                            value={masterValue?.toDateString()}
                            disabled={true}
                        />
                        : <Calendar
                            id={name}
                            value={value}
                            onChange={(e) => handleDateChange(e)}
                            showOnFocus={false}
                            showIcon={true}
                            icon="pi pi-calendar"
                            onBlur={() => console.log('blur')}
                            showTime
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default DateField;