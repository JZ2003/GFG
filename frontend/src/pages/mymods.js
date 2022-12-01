import React from 'react';
import './styles.css'

class My_Mods extends React.Component{
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
        this.getInfo(this.state.user);
      }

    async getInfo (user) {
        if(user == null){
        }
        else{
            this.setState({
                signedIn: true
            })
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
            if(response){
                this.setState({
                    mods: response
                });
            }
            else{
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    async deleteMods(modname){
        await fetch('http://localhost:3030/cancelMod', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'modname':modname,
            },
        })
            .then((response) => console.log(response))
            .catch((err) => {
                console.log(err.message);
            });
    }

    handleX = (modname) => {
        this.deleteMods(modname).then(()=>{
            this.getInfo(this.state.user
        )})
    }

    render(){
        return (
            <div className="container">
                {!this.state.signedIn && <center><h1>Please sign in.</h1></center>}
                {this.state.signedIn && <center><h1>Your uploaded mods</h1></center>}<br/>
                {this.state.signedIn && 
                    this.state.mods.map((mod) => {
                        return(
                            <div className="grid-container" key={mod.modName}>
                        <img className='icon-item' src={`data:image/jpeg;base64,${mod.icon}`}
                                    alt="Mod Icon" width="100" height="100"></img>
                        <a href={"http://localhost:3000/mods/" + mod.modName} className="center-item">
                            <div className="title-item">
                                <h2>{mod.modName}</h2>
                            </div><br/>
                            <div className="game-item">
                                For <b>{mod.gameName}</b>
                            </div><br/>
                            <div className="slug-item">
                                {mod.slug}
                            </div><br/>
                            <div className="tags-item">
                                Tags:&nbsp;
                                {mod.tags.map((tag) => {
                                    return(
                                        <b>{tag}&nbsp;&nbsp;</b>
                                    );
                                })}
                            </div><br/>
                            <div className="date-item">
                                Created at {mod.dateCreated} &nbsp;&nbsp; Updated at {mod.dateModified}
                            </div><br/>
                        </a>
                            <div className="right-item">
                                <b className="num-views-item">Views: {mod.views}</b><br/>
                                <b className="num-likes-item">Likes: {mod.likes}</b><br/>
                                <a href={"http://localhost:3000/edit/" + mod.modName}>Edit</a>
                            </div>
                    </div>
                        );
                    })
                }  
            </div> 
        );
    };
}

export default My_Mods;
