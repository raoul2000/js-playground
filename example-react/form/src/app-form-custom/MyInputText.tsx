import React from 'react'

export type Props = {
    name:string
}
const MyInputText:React.FC<Props> = ({name}) => {
    return (
        <input 
            type="text"
            name={name}
            id={name}
        />
    )
}


export default MyInputText;