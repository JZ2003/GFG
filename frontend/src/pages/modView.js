import React from 'react';
// import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
import './styles.css'

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
            views: 0,
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
                        console.log(data);
                        this.setState({
                            modName: data.modName, 
                            author: data.author,
                            desc: data.desc,
                            dateCreated: data.dateCreated,
                            dateModified: data.dateCreated,
                            url: data.url,
                            gameName: data.gameName,
                            tag: data.tag,
                            views: data.views,
                            icon: data.icon
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

    addFavorite(){
        this.state.addFav(this.state.user, this.state.modName);
        this.state.addLike(this.state.modName);
    }

    async addFav(user, modName){
        await fetch('http://localhost:3030/addFavorite', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                username: user,
                modname: modName
            },
        })
            .then((response) => {
                //console.log(response);
                if(response.status === 200){
                    console.log('favorited');
                }
                else{
                    console.log('did not favorite');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    async addLike(modName){
        await fetch('http://localhost:3030/updateLikes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                modname: modName,
                change: '1'
            },
        })
            .then((response) => {
                //console.log(response);
                if(response.status === 204){
                    console.log('liked');
                }
                else{
                    console.log('did not like');
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
                    marginTop: '20px'
                }}>
                <div style = {{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <h1>Mod Name: {this.state.modName}</h1>
                    <Button variant="contained" color="primary" /*onClick={addFavorite}*/>
                        Favorite
                    </Button>
                </div>
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
