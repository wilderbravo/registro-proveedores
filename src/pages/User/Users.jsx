import React from 'react'
import UserForm from "./UserForm";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Users() {

    const classes = useStyles();

    return (
        <>
            <Paper className={classes.pageContent}>
                <UserForm />
            </Paper>
        </>
    )
}
