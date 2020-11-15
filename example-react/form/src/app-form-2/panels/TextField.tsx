import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

// Component definition --------------------- 

type Props = {
    name: string
    initialValue: string
    onBlur: (name: string, value:string) => void
}

const TextField: React.FC<Props> = ({ onBlur, name, initialValue }): JSX.Element => {
    const [currentValue, setCurrentValue] = useState<string>(initialValue);

    const handleBlur = () => {
        onBlur(name, currentValue);
    }

    return (
        <div className="p-fluid">
            <div className="p-field p-grid">
                <label htmlFor="firstname" className="p-col-fixed" style={{ minWidth: '100px' }}>First Name:</label>
                <div className="p-col">
                    <InputText
                        id={name}
                        name={name}
                        value={currentValue}
                        type="text"
                        autoComplete="off"
                        onChange={(e) => setCurrentValue(e.currentTarget.value)}
                        onBlur={() => handleBlur()}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextField;
