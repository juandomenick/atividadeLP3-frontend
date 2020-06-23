import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@material-ui/core';

function Header() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick=''>
                    <Typography variant="h6">
                        Menu
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;