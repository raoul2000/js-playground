import React, { useContext } from 'react'
import { FormContext } from '../store';


const Form1: React.FC<{}> = () => {

    const { state, dispatch } = useContext(FormContext);

    const handleClick1 = (event:React.MouseEvent) => {
        event.stopPropagation();
        dispatch({ type: "ACTION_SET_FIRST_NAME", firstname: 'bob' });
    };
    const handleFirstNameChange = () => {
        dispatch({ type: "ACTION_SET_FIRST_NAME", firstname: 'bob' });
    };
    
    return (
        <>
            <h2>Form 1</h2>
            <form>
                {state.firstname},  {state.lastname}
                <div className="row">
                    <div className="col">
                        <label>first name : </label>
                        <input type="text" className="form-control" placeholder="First name" onChange={handleFirstNameChange}/>
                    </div>
                    <div className="col">
                        <label>last name : </label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                </div>
            </form>
            <button onClick={handleClick1}>click1</button>
        </>
    )
};

export default Form1;

