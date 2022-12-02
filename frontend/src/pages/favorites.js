import React from 'react';
import ModBox from './modbox'; 
import './styles.css'

class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: localStorage.getItem('user'),
            signedIn: false,
            modObj: [],
            mods: []
        };
    }

    componentDidMount(){
        this.getFavorites(this.state.user)
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
                        this.setState({
                            modObj:[
                                ...this.state.modObj,
                                {
                                    modName: data.modName, 
                                    author: data.author,
                                    desc: data.desc,
                                    dateCreated: data.dateCreated,
                                    dateModified: data.dateCreated,
                                    url: data.url,
                                    gameName: data.gameName,
                                    tag: data.tag,
                                    views: data.views,
                                    icon: data.icon,
                                    likes: data.likes,
                                    comments: data.comments
                                }
                            ]
                            
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

    async getFavorites (user) {
        if(user == null){
        }
        else{
            this.setState({
                signedIn: true
            })
        }
        await fetch('http://localhost:3030/allFavorite', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                username: user
            },
        })
        .then(res => res.json())
        .then((response) => {
            if(response){
                let valid_favorite = []
                for (let i = 0; i < response.Favorite.length; i++) {
                    if (response.Favorite[i] !== null) {
                        valid_favorite.push(response.Favorite[i]);
                    }
                }
                this.setState({
                    mods: valid_favorite
                });
            }
            else{
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    remFavorite=()=>{
        this.remFav(this.state.user, this.state.modName);
        this.remLike(this.state.modName);
    }

    async remFav(user, modName){
        if(user === null || modName == null){
            window.alert("Please sign in first!")
            return;
        }
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
            }
            else{
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    async remLike(modName){
        await fetch('http://localhost:3030/updateLikes', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                modname: modName,
                change: '1'
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
    };

    render(){
        return (
            <div className="container">
                {!this.state.signedIn && <center><h1>Please sign in.</h1></center>}
                {this.state.signedIn && <h1><center>Favorites!</center></h1>}<br/>
                {this.state.signedIn && 
                    this.state.mods.map((mod) => {
                        return(
                            <div key={mod.modName}>
                                <ModBox mod={mod}/>
                            </div>
                        );
                    })
                }                
            </div>
            
        );
    };

}

export default Favorites;