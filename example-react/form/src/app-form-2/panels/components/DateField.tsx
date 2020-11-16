import React, { useState } from 'react'

import { Calendar } from 'primereact/calendar';

// Component definition --------------------- 

type Props = {
    name: string
    label: string
    initialValue: Date
    onChange: (name: string, value: Date) => void
}
type CalendarChangeEvent = { originalEvent: Event, value: Date | Date[], target: { name: string, id: string, value: Date | Date[] } };

const DateField: React.FC<Props> = ({ onChange, name, label, initialValue }): JSX.Element => {

    // when user selects a date from the calendar and close it, no blur event is fired
    // Actually blur event is fired only when the input text field looses focus, which is the 
    // case when the date is selected from the calendar layer. If several date are selected successively
    // from the cal layer, no blur event => no way to update the value
    const handleDateChange = (e: CalendarChangeEvent) => {
        const d: Date = Array.isArray(e.value) ? e.value[0] : e.value;
        if (d) {
            console.log('cal change', d)
            onChange(name, d);
        }
    }

    return (
        <div className="p-field p-grid">
            <label htmlFor={name} className="p-col-fixed" style={{ minWidth: '100px' }}>{label}:</label>
            <div className="p-col">
                <Calendar
                    id={name}
                    value={initialValue}
                    onChange={(e) => handleDateChange(e)}
                    showOnFocus={false}
                    showIcon={true}
                    icon="pi pi-calendar"
                    onBlur={() => console.log('blur')}
                    showTime
                />
            </div>
        </div>
    )
}

export default DateField;