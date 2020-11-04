import React from 'react'


const Form1: React.FC<{}> = () => {

    return (
        <form>
            <div className="row">
                <div className="col">
                    <label>first name : </label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="col">
                    <label>last name : </label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
            </div>
        </form>
    )
};

export default Form1;

