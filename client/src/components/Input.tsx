import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'

interface inputInterface {
    half?: any;
    name: any;
    handleChange: any;
    label: any;
    autoFocus?: any;
    type?: any;
    handleShowPassword?: any;
}

export const Input = ({half, name, handleChange, label, autoFocus, type, handleShowPassword}: inputInterface) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                /*InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}*/
            />
        </Grid>
    )
}
