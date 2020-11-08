import React, { useReducer } from 'react';
import Form1 from './Form1';
import Wrapper1 from './Wrapper1';

import { FormContext, reducer, initialState } from './store';

function AppPlayContext() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="App">
            <FormContext.Provider value={{ state, dispatch }}>
                <Form1 />
                <hr />
                <Wrapper1 />
            </FormContext.Provider>
        </div>
    );
}

export default AppPlayContext;