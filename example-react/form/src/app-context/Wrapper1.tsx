import React from 'react';
import Child1 from './Child1';
import Form2 from './Form2';

const Wrapper1 = () => {
    return (
        <div style={{ backgroundColor: "gray", padding: '1em' }}>
            <Form2 />
            <div>
                <Child1 name="deep 1" />
                <Child1 name="deep 2" />
                <Child1 name="deep 3" />
            </div>
        </div>
    )
}

export default Wrapper1;