import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';


class ModView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modName: props.modName, 
            author: '',
            desc: '',
            dateCreated: '',
            dateModified: '',
            url: '',
            gameName: '',
            tag: '',
            views: '',
            icon: ''
        };
        this.getMod(this.state.modName);
    }

    async getMod(name){
        await fetch('http://localhost:3030/currMod?modName=' + name, {
            method: 'GET',
            // body: JSON.stringify({
            //     user: '',
            //     pass: ''
            // }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                //console.log(response);
                if(response.status >= 200 && response.status <= 204){
                    this.state.mods = response.json().then((data) => {
                        this.setState({
                            modName: data[0].modName, 
                            author: data[0].author,
                            desc: data[0].desc,
                            dateCreated: data[0].dateCreated,
                            dateModified: data[0].dateCreated,
                            url: data[0].url,
                            gameName: data[0].gameName,
                            tag: data[0].tag,
                            views: data[0].views,
                            icon: data[0].icon
                        });
                    });
                }
                else{
                    console.log('did not succeed lol');
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
                <img className='modIcon' src={this.state.url} alt='mod icon'></img>
                <p>
                    Author: {this.state.author}<br></br>
                    Desc: {this.state.desc}<br></br>
                    Date Created: {this.state.dateCreated}<br></br>
                    Date Modified: {this.state.dateModified}<br></br>
                    Download URL: {this.state.url}<br></br>
                    Game: {this.state.gameName}  
                    tag: {this.state.tag}  
                    views: {this.state.views}     
                </p>
            </div>
            
        );
        };
    }

export default ModView;
