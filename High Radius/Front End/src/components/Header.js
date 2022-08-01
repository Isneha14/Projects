import { Grid } from '@material-ui/core';
import Image from './Image.jsx';
import Logo from './Logo.jsx';

function Header()
{
    return(
        <>
            <Grid container style = {{ padding: '10px 0px' }} >
                <Grid item xs={5}>
                    <Image />
                </Grid>
                <Grid item >
                    <Logo />
                </Grid>
            </Grid>
        </>
    )
}

export default Header;