// import {useLocation} from 'react-router-dom';
// import {useState,useEffect} from 'react';
import { formHelperTextClasses } from '@mui/material';
import React from 'react';
import './styles.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
			displayMods: [],
			query: "",
            selector: "modName",
            sorter: "",
			mods: []
			// user: localStorage.getItem('user'),
			// loggedIn: "false"
        };
        this.sortByKey = this.sortByKey.bind(this);
    }

    sortByKey(key) {
        if(key === "default"){
            this.state.displayMods.sort((a, b) => (a.views > b.views) ? 1 : -1);
        }
        else if(key === "likes"){
            this.state.displayMods.sort((a, b) => (a.likes > b.likes) ? 1 : -1);
        }
        else if(key === "alphabet"){
            this.state.displayMods.sort((a, b) => (a.modName > b.modName) ? 1 : -1);
        }
        else if(key === "date"){
            this.state.displayMods.sort((a, b) => (a.dateCreated > b.dateCreated) ? 1 : -1);
        }
        else{
            console.log("no keys called");
        }
      }

    async getDB () {
		// if(user != null){
		// 	loggedIn = true;
		// }
        await fetch('http://localhost:3030/listall', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then((response) => {
            // console.log(response);
            if(response /*status === 200*/){
                console.log("response: " + response);
				// console.log(response.length);
                this.setState({
                    mods: response.data,
					displayMods: this.state.mods
                });
                // this.state.mods = response;
                console.log(this.state.mods);
                console.log("fetched");
                this.sortByKey("default");
            }
            else{
                console.log('no mods associated with user');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

	filterMods(regex){
		if(this.state.query.length > 0) {
		  let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
		  //display filtered mods
		  this.setState({displayMods:newMods});
		} else if (this.state.query.length === 0) {
		  //display all mods
		  this.setState({displayMods:this.state.mods});
		}
	  }

	componentDidMount(){
		this.getDB();

		console.log("display mods: " + this.state.displayMods);
	}

	componentDidUpdate(prevProps, prevState){
		if (this.state.query !== prevState.query) {
			let regex = new RegExp(this.state.query, "i");
			if(this.state.query.length > 0) {
				// console.log(this.state.mods);
                // console.log("this is the current selector state: " + this.state.selector);
                let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
                if(this.state.selector === "modName"){
				    newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
                }
                else if(this.state.selector === "gameName"){
                    newMods = [...this.state.mods].filter((mod) =>regex.test(mod.gameName));
                }
                else if(this.state.selector === "author"){
                    newMods = [...this.state.mods].filter((mod) =>regex.test(mod.author));
                }
                else if(this.state.selector === "tag"){
                    newMods = [...this.state.mods].filter((mod) =>regex.test(mod.tag));
                }
                else{
                    newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
                }
				//display filtered mods
				this.setState({displayMods:newMods});
			} else if (this.state.query.length === 0) {
				//display all mods
				this.setState({displayMods:this.state.mods});
			}
		  }
          if (this.state.sorter !== prevState.sorter) {
            console.log(this.state.sorter);
            this.sortByKey(this.state.sorter);
          }
	}

	handleXClick(){
		console.log("delete");
        this.setState({query:""});
    }


    render(){
        return (
            <div className="container">
				<h1><center>Welcome to gamersforgamers!</center></h1>
				{/* {loggedIn && <p>Welcome {user}! Checkout our mods!</p>} */}
                {/* <h2>Mod Name: {this.state.modName}</h2> */}
            <center>
			<input 
                className="search-bar"
                key="random1"
                maxLength={60}
                value={this.state.query}
                onChange={(e) => this.setState({query:e.target.value})}
            />

            <select name="select-tag" id="options" onChange={(e) => this.setState({selector:e.target.value})} value={this.state.selector}>
                <option value="modName">mod name</option>
                <option value="gameName">game name</option>
                <option value="author">author name</option>
                <option value="tag">tags</option>
            </select>

            <select name="sort-tag" id="options" onChange={(e) => this.setState({sorter:e.target.value})} value={this.state.sorter}>
                <option value="default">views</option>
                <option value="likes">likes</option>
                <option value="alphabet">alphabet</option>
                <option value="date">date created</option>
            </select>


			<button onClick={() => this.handleXClick()}
                className="x-button"
            >
                X
            </button>
			</center>
			{this.state.displayMods.map((mod) => {
				return(
					<a href={"http://localhost:3000/mods/" + mod.modName} className="card">
						<p style={{
                            display: 'flex',
                            gap: '5px'
                            // justifyContent: 'space-between'
                        }}>
                            <img className='modIcon' src={`data:image/jpeg;base64,${mod.icon}`} 
                            alt="Mod Icon" width="100" height="100"></img>
                            Mod Name: {mod.modName}<br/>
                            Game: {mod.gameName} <br/>
                            Author: {mod.author}<br/>
                            Likes: {mod.likes} <br/>
                            Views: {mod.views}<br/>
                            {/* Date Created: {mod.dateCreated}
                            Date Modified: {mod.dateModified}<br/>
                            Desc: {mod.desc}<br/>
                            Tag: {mod.tag}<br/>
                            Download URL: {mod.url}<br/> */}
                        </p>
					</a>
				);
            })}
            </div>
            
        );
    };
}



export default Home;
