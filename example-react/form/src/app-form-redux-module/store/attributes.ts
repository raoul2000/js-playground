import { useState } from 'react'
import { createJsxAttributes } from 'typescript';
import { store } from '../../app-form-redux/store';

const storeKey: string = 'attributes';

export interface AttributesState {
    readonly name?: string
    readonly age?: number
}

const initialState: AttributesState = {
    name: 'bob',
    age: 12
}

const reducers = {
    setName: (attributes: AttributesState, name: string): AttributesState => ({ ...attributes, name }),
    setAge: (attributes: AttributesState, age: number): AttributesState => ({ ...attributes, age })
}

const getState = (): AttributesState => store.getState()[storeKey];

