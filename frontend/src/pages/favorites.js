import React from 'react';
import './styles.css'
import ModBox from './modbox'; 


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
        console.log(this.state.mods.length);
    }

    // componentDidUpdate() {
    //     this.getFavorites(this.state.user);
    //     console.log(this.state.mods.length);
    // }

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
                    console.log('did not succeed lol');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    async getFavorites (user) {
        console.log("user is: " + user);
        if(user == null){
            window.alert("You are not signed into an account!");
        }
        else{
            // this.state.signedIn = true;
            this.setState({
                signedIn: true
            })
            console.log(this.state.signedIn);
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
            // console.log(response);
            if(response /*status === 200*/){
                console.log(response.Favorite);
                console.log(response);
                let valid_favorite = []
                for (let i = 0; i < response.Favorite.length; i++) {
                    if (response.Favorite[i] !== null) {
                        valid_favorite.push(response.Favorite[i]);
                    }
                }
                this.setState({
                    mods: valid_favorite
                });
                // this.state.mods = response;
                console.log(this.state.mods);
                console.log("fetched");
            }
            else{
                console.log('no favorites associated with user');
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
            }
            else{
                console.log('did not favorite');
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
            <div className="container">
                {!this.state.signedIn && <center><h1>Please sign in.</h1></center>}
                {this.state.signedIn && <h1><center>Favorites!</center></h1>}<br/>
                {this.state.signedIn && 
                    this.state.mods.map((mod) => {
                        return(
                            <div key={mod.modName}>
                                <ModBox mod={mod}/><br/>
                            </div>
                        );
                    })
                }
                {/* {this.state.signedIn && <p>Game Name: {this.state.gameName}</p>}<br/>
                {this.state.signedIn && <p>Description: {this.state.Desc}</p>}<br/> */}
                
            </div>
            
        );
    };

}

export default Favorites;