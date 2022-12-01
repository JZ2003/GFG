import React from 'react';
// import { Box } from '@mui/material';
// import {useLocation} from 'react-router-dom';
import './styles.css'

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
            window.alert("You are not signed into an account!");
        }
        else{
            // this.state.signedIn = true;
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
            if(response /*status === 200*/){
                console.log("response: " + response);
                this.setState({
                    mods: response
                });
                // this.state.mods = response;
                // console.log(this.state.mods);
                // // this.setState({
                // //     modName:  this.state.mods[0].modName,
                // //     gameName: this.state.mods[0].gameName,
                // //     Desc: this.state.mods[0].desc
                // // })
                // console.log("fetched");
            }
            else{
                console.log('no mods associated with user');
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
        console.log(modname);
        this.deleteMods(modname).then(()=>{
            this.getInfo(this.state.user
        )})
        // console.log('before getinfo')
        // console.log(this.state.mods);
        
        console.log('after getinfo')
        console.log(this.state.mods);
    }

    handleEdit(){
        // working
    }

    // componentDidUpdate(prevProps, prevState){
	// 	if (this.state.mods !== prevState.mods) {
    //         console.log("this changed*******");
    //         console.log(this.state.mods);
    //         this.setState({
    //             mods:this.state.mods
    //         });
    //     }
    // }

    render(){
        console.log("rendering...")
        console.log(this.state.mods);
        return (
            <div className="container">
                    {/* [ marginLeft: '10%',
                    marginRight: '10%',
                    marginTop: '20px',] */}
                {!this.state.signedIn && <center><h1>Please sign in.</h1></center>}
                {this.state.signedIn && <center><h1>Your uploaded mods</h1></center>}<br/>
                {this.state.signedIn && 
                    this.state.mods.map((mod) => {
                        console.log("consider mods map")
                        console.log(this.state.mods)
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
