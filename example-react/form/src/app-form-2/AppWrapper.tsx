import React from 'react';
import { Provider } from 'react-redux';
import FormWrapper from './FormWrapper';
import { store } from './store';


const AppWrapper: React.FC<{}> = () => {
    return (
        <Provider store={store}>
            <FormWrapper />
        </Provider >
    )
}

export default AppWrapper;