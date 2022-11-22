import React from 'react';
// import { Box } from '@mui/material';
// import {useLocation} from 'react-router-dom';
import './mymods.css'

class My_Mods extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            signedIn: false,
            modObj: [],
            mods: []
            // modName: "",
            // gameName: "",
            // Desc: "",
        };
        // this.getInfo(this.state.user);
    }

    componentDidMount(){
        this.getInfo(this.state.user);
      }

    async getInfo (user) {
        console.log("user is: " + user);
        if(user == null){
            console.log("not logged in");
        }
        else{
            this.state.signedIn = true;
            this.setState({
                signedIn: true
            })
            console.log(this.state.signedIn);
        }
        await fetch('http://localhost:3030/filterMod', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                filter : JSON.stringify({"author": user})
            },
        })
        .then(res => res.json())
        .then((response) => {
            // console.log(response);
            if(response /*status === 200*/){
                console.log("response: " + response);
                this.setState({
                    mods: response
                });
                // this.state.mods = response;
                console.log(this.state.mods);
                // this.setState({
                //     modName:  this.state.mods[0].modName,
                //     gameName: this.state.mods[0].gameName,
                //     Desc: this.state.mods[0].desc
                // })
                console.log("fetched");
            }
            else{
                console.log('no mods associated with user');
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
                {!this.state.signedIn && <center><h1>Please sign in.</h1></center>}
                {this.state.signedIn && <h1>Your uploaded mods</h1>}<br/>
                {this.state.signedIn && 
                    this.state.mods.map((mod) => {
                        return(
                            <a href={"http://localhost:3000/" + mod.modName} className="card">
                                <p>
                                    Mod Name: {mod.modName}
                                    Game: {mod.gameName} 
                                    Author: {mod.author}
                                    views: {mod.views}<br/>
                                    Date Created: {mod.dateCreated}
                                    Date Modified: {mod.dateModified}<br/>
                                    Desc: {mod.desc}<br/>
                                    tag: {mod.tag}<br/>
                                    Download URL: {mod.url}
                                </p>
                            </a>
                        );
                    })
                }
                {/* {this.state.signedIn && <p>Game Name: {this.state.gameName}</p>}<br/>
                {this.state.signedIn && <p>Description: {this.state.Desc}</p>}<br/> */}
                
            </div>
            
        );
    };
}

export default My_Mods;
