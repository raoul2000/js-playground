import React, { useEffect, useReducer, useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeflex/primeflex.css';

type Person = {
    name: string
    email: string
}
type Country = {
    code: string
    name: string
}
type FormData = {
    name?: string
    country?: Country
    selectedPerson?: Person
    persons: Person[]
}

const initialForData: FormData = {
    persons: []
};
const allPersons: Person[] = [
    { name: 'bob', email: 'bob@email.com' },
    { name: 'alice', email: 'alice@email.com' },
    { name: 'charles', email: 'charles@email.com' },
    { name: 'David', email: 'David@email.com' },
]
const allNames: string[] = [
    'Albert', 'Bernard', 'Carole', 'Bob', 'Alfred', 'Christian'
];

const allCountries: Country[] = [
    { name: 'France', code: 'FR' },
    { name: 'France 2', code: 'FRG' },
    { name: 'Spain', code: 'SP' },
    { name: 'United states', code: 'USA' },
    { name: 'Argentina', code: 'AR' },
];

const MyForm: React.FC<{}> = () => {
    const [formData, setFormData] = useState<FormData>(initialForData);
    const [filteredNames, setFilteredNames] = useState<string[]>(allNames);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>(allCountries);
    const [filteredPersons, setFilteredPersons] = useState<Person[]>(allPersons);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }
    const searchName = (event: { originalEvent: Event, query: string }) => {
        setTimeout(() => {
            let names: string[];
            if (!event.query.trim().length) {
                names = [...allNames];
            }
            else {
                names = allNames.filter((name) => {
                    return name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredNames(names);
        }, 250);
    }
    const searchCountries = (event: { originalEvent: Event, query: string }) => {
        setTimeout(() => {
            let countries: Country[];
            if (!event.query.trim().length) {
                countries = [...allCountries];
            }
            else {
                countries = allCountries.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredCountries(countries);
        }, 250);
    }
    const searchPersons = (event: { originalEvent: Event, query: string }) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                // TODO: remove persons already added to formData.persons (duplicates are forbidden)
                setFilteredPersons([...allPersons]);
            }
            else {
                setFilteredPersons(allPersons.filter((person) => {
                    return person.name.toLowerCase().startsWith(event.query.toLowerCase());
                }));
            }
        }, 250);
    }
    const handleChangeName = (e: { originalEvent: Event, value: any, target: { name: string, id: string, value: any } }) => {
        setFormData({
            ...formData,
            name: e.value
        })
    }
    const handleChangeCountry = (e: { originalEvent: Event, value: any, target: { name: string, id: string, value: any } }) => {
        if (typeof e.value === 'string') {
            if (e.value.length !== 0) {
                setFormData({
                    ...formData,
                    country: {
                        name: e.value,
                        code: 'XX'
                    }
                })
            } else {
                setFormData({
                    ...formData,
                    country: undefined
                })
            }
        } else {
            setFormData({
                ...formData,
                country: e.value
            })
        }
    }
    const handleChangePerson = (e: { originalEvent: Event, value: any, target: { name: string, id: string, value: any } }) => {
        if (typeof e.value === 'string') {
            if (e.value.length !== 0) {
                setFormData({
                    ...formData,
                    selectedPerson: {
                        name: e.value,
                        email: ''
                    }
                })
            } else {
                setFormData({
                    ...formData,
                    selectedPerson: undefined
                })
            }
        } else {
            setFormData({
                ...formData,
                selectedPerson: e.value

            })
        }
    }
    const handleOnAddName = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(formData.selectedPerson);
    }
    const handleAddPerson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(formData);
        const { selectedPerson } = formData;
        if (selectedPerson && selectedPerson?.email !== '') {
            setFormData({
                ...formData,
                persons: [...formData.persons, selectedPerson]
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-fluid p-grid p-formgrid">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="country">Country</label>
                        <AutoComplete
                            value={formData.country}
                            field="name"
                            suggestions={filteredCountries}
                            completeMethod={searchCountries}
                            dropdown={true}
                            onChange={handleChangeCountry}
                        />
                    </div>
                    <hr />
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <AutoComplete
                            value={formData.name}
                            suggestions={filteredNames}
                            completeMethod={searchName}
                            dropdown={true}
                            onChange={handleChangeName}
                        />
                        <Button label="Add" onClick={handleOnAddName} type="button" />
                    </div>
                    <div className="p-field">
                        <label htmlFor="person">Person</label>
                        <AutoComplete
                            name="person"
                            id="person"
                            field="name"
                            value={formData.selectedPerson}
                            suggestions={filteredPersons}
                            completeMethod={searchPersons}
                            dropdown={true}
                            onChange={handleChangePerson}
                        />
                        <Button label="Add" onClick={handleAddPerson} type="button" />
                        <div>
                            <DataTable value={formData.persons}>
                                <Column field="name" header="Name" sortable></Column>
                                <Column field="email" header="email" sortable></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            <Button label="Submit" type="submit" />
        </form>
    )
}
/*

                    */
export default MyForm;