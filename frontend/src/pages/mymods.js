import React from 'react';
import { Box } from '@mui/material';
import {useLocation} from 'react-router-dom';


function My_Mods(){
    const location = useLocation();
    //location.state.username


    return (
        <div style = {{
                marginLeft: '10%',
                marginTop: '20px',
                width: '50%'
            }}>
            <Box 
                color="white"
                bgcolor="black" p={1}>
                Check out your mods!
            </Box>
        </div>
    );
};

export default My_Mods;
