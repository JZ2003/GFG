import React from 'react';
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
        this.getFavorites(this.state.user);
    }

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
                console.log(response);
                this.setState({
                    mods: response
                });
                // this.state.mods = response;
                console.log("mods:" + this.state.mods);
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

    render(){
        return (
            <div className="container">
                {!this.state.signedIn && <center><h1>Please sign in.</h1></center>}
                {this.state.signedIn && <h1>Your favorites!</h1>}<br/>
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

export default Favorites;