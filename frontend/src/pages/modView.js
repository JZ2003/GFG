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
        this.getMod;
    }

    async getMod(){
        await fetch('http://localhost:3030/currMod?modName=' + this.state.modName, {
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
                <h2>Author: {this.state.author}</h2>
                <h3>Desc: {this.state.desc}</h3>
                <h4>Date Created: {this.state.dateCreated}</h4>
                <h5>Date Modified: {this.state.dateModified}</h5>
                <h6>Download URL: {this.state.url}</h6>
                <h7>Game: {this.state.gameName}     </h7>
                <h8>tag: {this.state.tag}      </h8>
                <h9>views: {this.state.views}     </h9>
            </div>
            
        );
        };
    }

export default ModView;
