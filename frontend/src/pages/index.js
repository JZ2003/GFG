// import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import React from 'react';
import './styles.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
			displayMods: [],
			query: "",
            selector: "modName",
			mods: []
			// user: localStorage.getItem('user'),
			// loggedIn: "false"
        };
        // this.getDB(this.state.user);
    }
	
	//	const [user, setUser] = useState('');
	//	console.log(location.state.username);
	//	console.log(username)

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
            
			<button onClick={() => this.handleXClick()}
                className="x-button"
            >
                X
            </button>
			</center>
			{this.state.displayMods.map((mod) => {
				return(
                    <center>
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
                    </center>
				);
            })}
            </div>
            
        );
    };
}



export default Home;
