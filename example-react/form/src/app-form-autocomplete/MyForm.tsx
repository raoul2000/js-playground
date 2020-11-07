import React, { useEffect, useReducer, useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

type Country = {
    code: string
    name: string
}
type FormData = {
    name?: string,
    country?: Country
}

const initialForData: FormData = {};
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
    const handleChange = (e: { originalEvent: Event, value: any, target: { name: string, id: string, value: any } }) => {
        setFormData({
            ...formData,
            name: e.value
        })
    }
    const handleChangeCountry = (e: { originalEvent: Event, value: any, target: { name: string, id: string, value: any } }) => {
        if( typeof e.value === 'string') {
            if(e.value.length !== 0) {
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
    const handleOnCommit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(formData);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-fluid p-grid p-formgrid">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <AutoComplete
                            value={formData.name}
                            suggestions={filteredNames}
                            completeMethod={searchName}
                            dropdown={true}
                            onChange={handleChange}
                        />
                        <Button label="Submit" onClick={handleOnCommit} />
                    </div>
                </div>
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
                </div>
            </div>
        </form>
    )
}

export default MyForm;