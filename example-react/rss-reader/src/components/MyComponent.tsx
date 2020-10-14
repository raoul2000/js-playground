import React from 'react';
import { connect, ConnectedProps } from 'react-redux'
import {sendMessage} from '../store/chat/actions';
interface RootState {
    isOn: boolean
}

const mapState = (state: RootState) => ({
    isOn: state.isOn
})

const mapDispatch = {
    toggleOn: () => sendMessage({
        user: "bob",
        message: "hello",
        timestamp: 1
    })
}

const connector = connect(mapState, mapDispatch)

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    backgroundColor: string
}

const MyComponent = (props: Props) => (
    <div style={{ backgroundColor: props.backgroundColor }}>
        <button onClick={props.toggleOn}>
            Toggle is {props.isOn ? 'ON' : 'OFF'}
        </button>
    </div>
)

export default connector(MyComponent)