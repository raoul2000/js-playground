import React, { useContext } from 'react'
import { FormContext } from './store';


const Form2: React.FC<{}> = () => {

    const { state, dispatch } = useContext(FormContext);

    const handleClick1 = () => {
        dispatch({ type: "ACTION_SET_FIRST_NAME", firstname: 'Alice' });
    };

    return (
        <>
            <h2>Form 2</h2>
            <div>
                {state.firstname},  {state.lastname}
            </div>
            <button onClick={handleClick1}>click1</button>
        </>
    )
};

export default Form2;

