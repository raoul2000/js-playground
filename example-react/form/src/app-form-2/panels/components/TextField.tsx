import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

// Component definition --------------------- 

type Props = {
    name: string
    label: string
    initialValue: string
    onBlur: (name: string, value:string) => void
}

const TextField: React.FC<Props> = ({ onBlur, name, label, initialValue }): JSX.Element => {
    const [currentValue, setCurrentValue] = useState<string>(initialValue);
    //const [errors, setErrors] = useState<string>({});
    //const [touched, setTouched] = useState<boolean>({});

    const handleBlur = () => {
        onBlur(name, currentValue);
    }
    const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        setCurrentValue(e.currentTarget.value);
    }

    return (
        <div className="p-fluid">
            <div className="p-field p-grid">
                <label htmlFor={name} className="p-col-fixed" style={{ minWidth: '100px' }}>{label}:</label>
                <div className="p-col">
                    <InputText
                        id={name}
                        name={name}
                        value={currentValue}
                        type="text"
                        autoComplete="off"
                        onChange={(e) => handleChange(e)}
                        onBlur={() => handleBlur()}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextField;
