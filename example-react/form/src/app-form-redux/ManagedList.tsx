import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type Person = {
    name: string
    email: string
}

const allPersons: Person[] = [
    { name: 'bob', email: 'bob@email.com' },
    { name: 'alice', email: 'alice@email.com' },
    { name: 'charles', email: 'charles@email.com' },
    { name: 'David', email: 'David@email.com' },
    { name: 'Bernard', email: 'David@email.com' },
    { name: 'Eric', email: 'David@email.com' },
    { name: 'Louise', email: 'David@email.com' },
    { name: 'Tom', email: 'David@email.com' }
]


const ManagedList: React.FC<{}> = () => {

    // options for the dropdown 
    const [options, setOptions] = useState<Person[]>(allPersons);
    // the current dropdown selected option
    const [selectedOption, setSelectedOption] = useState<Person>();
    // Data list
    const [values, setValues] = useState<Person[]>([]);

    const addPerson = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedOption) {
            setValues([selectedOption, ...values])
            setSelectedOption(undefined)
            setOptions(options.filter( item => item.name !== selectedOption.name));
        }
    }
    const itemTemplate = (rowData: Person) => (
        <>
            {rowData.name} - {rowData.email}
        </>
    )
    const removeItemFromList = (e: React.MouseEvent, rowData: Person) => {
        e.stopPropagation();
        setValues(
            values.filter( item => item.name !== rowData.name)
        );
        setOptions([rowData,...options]);
    }
    const actionBodyTemplate = (rowData: Person) => (
        <>
            <Button icon="pi pi-trash" type="button" className="p-button-rounded p-button-outlined p-button-secondary" onClick={(e) => removeItemFromList(e, rowData)} />
        </>
    )
    return (
        <>
            <div className="p-field p-grid"> 
                <div className="p-col" style={{ minWidth: '250px' }}>
                    <Dropdown
                        value={selectedOption}
                        dataKey="name"
                        options={options}
                        onChange={(e) => setSelectedOption(e.value)}
                        optionLabel="name"
                        filter
                        showClear
                        filterBy="name"
                        placeholder="Select a person"
                        resetFilterOnHide={true}
                        
                    />
                </div>
                <div className="p-col-fixed" style={{ width: '100px' }}>
                    <Button label="Add" type="button" icon="pi pi-check" onClick={addPerson} disabled={!selectedOption} />
                </div>
            </div>
            <div className="p-field p-grid">
                <div className="p-col" >
                    <DataTable value={values} scrollable scrollHeight="200px">
                        <Column field="name" body={itemTemplate} header={`${values.length} person(s) selected`}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default ManagedList