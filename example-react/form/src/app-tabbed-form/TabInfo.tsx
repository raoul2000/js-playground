import React, { useEffect, useReducer, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';

type OwnProps = {
    onChange: (info:string) => void
    value:string
} 
console.log('TabInfo');

const TabInfo: React.FC<OwnProps> = ({onChange, value}) => {
    // state could be managed by the component and not by the parrent (or the context)
    //const [info, setInfo] = useState<string>('');

    // using the useEffect clean-up function it could be possible to
    // send the new value to parent component
    //useEffect(() => () => console.log('unmount'), []);

    return (
        <div className="p-field p-grid">
            <label htmlFor="firstname" className="p-col-fixed" style={{ width: '100px' }}>info</label>
            <div className="p-col">
                <InputText
                    id="info"
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e.currentTarget.value);
                        //setInfo(e.currentTarget.value)
                    }}
                />
            </div>
        </div>
    )
}

export default TabInfo;