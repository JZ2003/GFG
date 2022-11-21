import React from 'react';
import { Box } from '@mui/material';
import {useLocation} from 'react-router-dom';

class My_Mods extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
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
                filter : JSON.stringify({"author": user})
            },
        })
        .then((response) => {
            if(response.status === 200){
                this.state.mods = response.json().then((data) => {
                    console.log(data);
                    this.setState({modName: data[0].modName});
                    this.setState({mods: data});
                });
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
                <h1>Yours Mods: </h1><br/>
                <h2>Mod Name: {this.state.modName}</h2>
                
            </div>
            
        );
    };
}

export default My_Mods;
