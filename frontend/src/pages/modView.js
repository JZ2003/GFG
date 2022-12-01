import React from 'react';
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
            }
            else{
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
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    addFavorite=()=>{
        this.addFav(this.state.user, this.state.modName);
    }

    async addFav(user, modName){
        await fetch('http://localhost:3030/addFavorite', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                username: user,
                modname: modName
            },
        })
        .then((response) => {
            if(response.status === 200){
                window.alert("You favorited this mod!");
                this.addLike(this.state.modName);
            }
            else{
                window.alert("You already favorited this mod!");
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
            }
            else{
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
                <div className="modTitle">
                    <h1>{this.state.modName}</h1>
                </div>
                <div className="modBody">
                    <p>
                        <img className="modIcon" src={`data:image/jpeg;base64,${this.state.icon}`} 
                            alt="Mod Icon">
                        </img><br/>
                        <b>Author:</b> {this.state.author}<br/>
                        <b>Date Created:</b> {this.state.dateCreated}<br/>
                        <b>Date Modified:</b> {this.state.dateModified}<br/><br/>
                        <b>Game</b><br/><hr/>
                        {this.state.gameName} <br/><br/>
                        <b>Description</b><br/><hr/>
                        {this.state.desc} <br/><br/>
                        <b>Download From</b><br/><hr/>
                        <a href={this.state.url}>{this.state.url}</a><br/><br/>
                        <b>Tags</b><br/><hr/>
                        {this.state.tags} <br/><br/>
                        <Button variant="contained" color="primary" onClick={this.addFavorite}>
                            Favorite
                        </Button>
                    </p>
                </div>
            </div>
            
        );
        };
    }

export default ModView;
