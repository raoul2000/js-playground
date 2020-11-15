import React, { useState } from 'react'

import { Calendar } from 'primereact/calendar';

// Component definition --------------------- 

type Props = {
    name: string
    label: string
    initialValue: Date
    onBlur: (name: string, value:Date) => void
}
type CalendarChangeEvent = { originalEvent: Event, value: Date | Date[], target: { name: string, id: string, value: Date | Date[] } };
const DateField: React.FC<Props> = ({ onBlur, name, label, initialValue }): JSX.Element => {

    const [currentValue, setCurrentValue] = useState<Date>(initialValue);

    const handleDateChange = (e: CalendarChangeEvent) => {
        const d: Date = Array.isArray(e.value) ? e.value[0] : e.value;
        if (d) {
            setCurrentValue(d);
        }
    }
    const handleBlur = () => {
        onBlur(name, currentValue);
    }    
    return (
        <div className="p-field p-grid">
            <label htmlFor={name} className="p-col-fixed" style={{ minWidth: '100px' }}>main:</label>
            <div className="p-col">
                <Calendar 
                    id={name}
                    value={currentValue} 
                    onChange={(e) => handleDateChange(e)}
                    onBlur={() => handleBlur()}                    
                    showTime 
                />
            </div>
        </div>
    )
}

export default DateField;