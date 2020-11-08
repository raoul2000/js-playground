import React from 'react'
import { Provider } from 'react-redux';
import {store} from './store';
import MyForm from './MyForm';

const MyFormWrapper: React.FC<{}> = () => {

    return (
        <Provider store={store}>
            <MyForm />
        </Provider>
    )
}

export default MyFormWrapper;
