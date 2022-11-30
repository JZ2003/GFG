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
            tags: [],
            views: 0,
            icon: '',
            likes: 0,
            slug: '',
            user: localStorage.getItem('user')
        };
        // this.getMod(this.state.modName);
    }

    componentDidMount(){
        this.getMod(this.state.modName);
        this.checkViewer(this.state.author);
      }

    checkViewer(author){
        if (author !== this.state.user){
            this.addView(this.state.modName);
        }
    }

    async addView(modName){
            await fetch('http://localhost:3030/updateView', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                modname: modName
            },
        })
        .then((response) => {
            if(response.status === 204){
                console.log('viewed');
            }
            else{
                console.log('no viewed');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    async getMod(name){
        await fetch('http://localhost:3030/currMod?modName=' + name, {
            method: 'GET',
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
                            dateModified: data.dateModified,
                            url: data.url,
                            gameName: data.gameName,
                            tags: data.tags,
                            views: data.views,
                            icon: data.icon,
                            likes: data.likes,
                            slug: data.slug
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

    addFavorite=()=>{
        this.addFav(this.state.user, this.state.modName);
        // this.removeAll();
    }
    
    async removeAll(){
        console.log('removing');
        await fetch('http://localhost:3030/cancelAllUsers', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {
            //console.log(response);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };


    async addFav(user, modName){
        console.log(user);
        await fetch('http://localhost:3030/addFavorite', {
            method: 'PUT',
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
                this.addLike(this.state.modName);
            }
            else{
                window.alert("You already favorited this mod!");
                console.log('did not favorite');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    async addLike(modName){
        await fetch('http://localhost:3030/updateLikes', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                modname: modName,
                change: '1'
            },
        })
        .then((response) => {
            console.log(response.status);
            if(response.status === 200){
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
                <div>
                    <h1>{this.state.modName}</h1>
                </div>
                <img className='modIcon' src={`data:image/jpeg;base64,${this.state.icon}`} 
                        alt="Mod Icon" width="200" height="200"></img>
                <p>
                    Game: {this.state.gameName} <br/> 
                    Author: {this.state.author}<br/>
                    Likes: {this.state.likes}<br/>
                    views: {this.state.views}<br/>
                    Desc: {this.state.desc}<br/>
                    Date Created: {this.state.dateCreated}<br/>
                    Date Modified: {this.state.dateModified}<br/>
                    Download URL: {this.state.url}<br/>
                    Tags: {this.state.tags}<br/>
                </p>
                <Button variant="contained" color="primary" onClick={this.addFavorite}>
                    Favorite
                </Button>
                <br/>
            </div>
            
        );
        };
    }

export default ModView;
