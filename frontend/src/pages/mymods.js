import React from 'react';
import { Box } from '@mui/material';
import {useLocation} from 'react-router-dom';

class My_Mods extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            modName: "",
            mods: []
        };
        this.getInfo(this.state.user);
    }

    async getInfo (user) {
        if(user == null){
            console.log("not logged in");
        }
        await fetch('http://localhost:3030/filterMod', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "filter": "{author: " + user +"}"
            },
        })
        .then((response) => {
            console.log(response);
            if(response.status == 200){
                console.log(response.parse());
                this.state.mods = response.parse();
                console.log("fetched");
            }
            else{
                console.log('did not succeed');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    render(){
        return (
            <div style = {{
                    marginLeft: '10%',
                    marginRight: '10%',
                    marginTop: '20px',
                }}>
                <h1>Mod Name: {this.state.modName}</h1>
                
            </div>
            
        );

        // return (
        //     <div style = {{
        //             marginLeft: '10%',
        //             marginTop: '20px',
        //             width: '50%'
        //         }}>
        //         <h1>Your Mods: </h1>
        //     </div>
        // );
    };
}



// function My_Mods(){
//     const location = useLocation();
//     //location.state.username


//     return (
//         <div style = {{
//                 marginLeft: '10%',
//                 marginTop: '20px',
//                 width: '50%'
//             }}>
//             <Box 
//                 color="white"
//                 bgcolor="black" p={1}>
//                 Check out your mods!
//             </Box>
//         </div>
//     );
// };

export default My_Mods;
