import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

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


const UsernameField: React.FC<{}> = () => {
    const [value, setValue] = useState<Person>();

    const personOptionTemplate = (option: Person) => (
        <div className="country-item">
            <div>{option.name} <em>{option.email}</em></div>
        </div>
    )

    return (
        <div className="p-field p-grid">
            <label htmlFor="lastname4" className="p-col-fixed" style={{ minWidth: '100px' }}>Person:</label>
            <div className="p-col">
                <Dropdown
                    value={value}
                    options={allPersons}
                    onChange={(e) => setValue(e.value)}
                    optionLabel="name"
                    filter
                    showClear
                    filterBy="name"
                    placeholder="Select a person"
                    itemTemplate={personOptionTemplate}
                />
            </div>
        </div>
    )
}

export default UsernameField