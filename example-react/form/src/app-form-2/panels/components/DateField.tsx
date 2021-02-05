import React, { useEffect, useState } from 'react'

import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

// Component definition ------------------------- 

type Props = {
    name: string
    label: string
    value?: Date
    masterValue?: Date
    computedValue?: Date
    isMaster?: boolean
    validate?: (d?: Date) => boolean
    onChange: (name: string, value: Date) => void
}
type CalendarChangeEvent = { originalEvent: Event, value: Date | Date[], target: { name: string, id: string, value: Date | Date[] } };

// WARNING : in version primereact 5.0.1 there is a bug preventing the text input value to be updated
// programmatically (only the calendar layer is updated)
// see https://forum.primefaces.org/viewtopic.php?f=57&t=63900

const DateField: React.FC<Props> = ({ onChange, name, label, value, masterValue, isMaster = false, validate }): JSX.Element => {
    const [locked, setLocked] = useState<boolean>(!isMaster && (masterValue === undefined || masterValue?.getTime() === value?.getTime()));
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    //debugger;

    useEffect(() => {
        setIsValid(validate === undefined || validate(value));
    }, [validate, value]);

/*     useEffect(() => {
        setLocked(!isMaster && (masterValue === undefined || masterValue?.getTime() === value?.getTime()));
    }, [masterValue]);
 */
    const handleDateChange = (e: CalendarChangeEvent) => {
        const d: Date = Array.isArray(e.value) ? e.value[0] : e.value;
        if (d) {
            d.setSeconds(0,0);
            onChange(name, d);
            setIsTouched(true);
        }
    }

    const toggleLock = () => {
        onChange(name, masterValue || new Date());
        setLocked(!locked);
    }

    const validationErrorClass = !isValid && isTouched ? 'p-invalid' : '';
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
                            className={validationErrorClass}
                        />
                        : <Calendar
                            id={name}
                            value={value}
                            onChange={(e) => handleDateChange(e)}
                            showOnFocus={false}
                            showIcon={true}
                            icon="pi pi-calendar"
                            onBlur={() => !isTouched && setIsTouched(true)}
                            showTime
                            className={validationErrorClass}
                        />
                    }
                </div>
                {isTouched && !isValid
                    && <small id="username-help" className="p-invalid">Username is not available.</small>
                }
            </div>
        </div>
    )
}

export default DateField;