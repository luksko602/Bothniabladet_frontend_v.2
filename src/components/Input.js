import { TextField } from '@material-ui/core'
import React from 'react'

const Input = ({submit, change}) => {

    return (
        <form onSubmit={submit} style={{margin: '2rem 0'}}>
            <TextField onChange={change} fullWidth label='Search for images! (natur, berg, spanien..)' />
        </form> 
    )
}

export default Input
