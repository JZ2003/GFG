
import React from 'react';
import { Box } from '@mui/material';


class modView extends React.component{
    render(){
        return (
            <div style = {{
                    marginLeft: '10%',
                    marginTop: '20px',
                    width: '50%'
                }}>
                <Box color="white" bgcolor="black" p={1}>
                        Check out your mods!
                    </Box>
            </div>
        );
        };
    }

export default modView;
