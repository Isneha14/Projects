import React from "react";
import { Typography, makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles({
    dif:{
        display : 'flex',
        width: '100%',
        justifyContent: 'center'
    },
    norm:{
        color: 'white'
    }
});

function Footers(){
    const classes = useStyles();
    return(
        <>
            <div className={classes.dif}>
                <Link href="#" varient= "body2" underline="always">Privacy Policy</Link>
                <Typography varient= "body2" className={classes.norm} >
                    | &#169; Copyright 2022 Highradius.All Rights Reserved.
                </Typography>
            </div>
        </>
    )
}

export default Footers;