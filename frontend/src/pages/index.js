// import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import React from 'react';
import './mymods.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // modName: "",
            // mods: [
			// 	{
			// 		modName: "persona 5 extra persona slots", 
            // 		author: "sunny",
            // 		desc: "whatever",
            // 		dateCreated: "2002/11/3",
            // 		dateModified: "2022/11/21",
            // 		url: "http://www.persona5tianxiadiyi.com",
            // 		gameName: "persona 5",
            // 		tag: "none",
            // 		views: 0,
            // 		icon: "whatever"
			// 	},
			// 	{
			// 		modName: "starcraft infinite minerals", 
            // 		author: "sunny",
            // 		desc: "whatever",
            // 		dateCreated: "2002/11/3",
            // 		dateModified: "2022/11/21",
            // 		url: "http://www.persona5tianxiadiyi.com",
            // 		gameName: "persona 5",
            // 		tag: "none",
            // 		views: 0,
            // 		icon: "whatever"
			// 	},
			// 	{
			// 		modName: "persona 5 costumes", 
            // 		author: "sunny",
            // 		desc: "whatever",
            // 		dateCreated: "2002/11/3",
            // 		dateModified: "2022/11/21",
            // 		url: "http://www.persona5tianxiadiyi.com",
            // 		gameName: "persona 5",
            // 		tag: "none",
            // 		views: 0,
            // 		icon: "whatever"
			// 	},
			// 	{
			// 		modName: "persona 5 more friends dlc", 
            // 		author: "sunny",
            // 		desc: "whatever",
            // 		dateCreated: "2002/11/3",
            // 		dateModified: "2022/11/21",
            // 		url: "http://www.persona5tianxiadiyi.com",
            // 		gameName: "persona 5",
            // 		tag: "none",
            // 		views: 0,
            // 		icon: "whatever"
			// 	},
			// ],
			displayMods: [],
			query: "",
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
				console.log(this.state.mods);
				let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
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
            <div>
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
            
			<button onClick={() => this.handleXClick()}
                className="x-button"
            >
                X
            </button>
			</center>
			{this.state.displayMods.map((mod) => {
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
            })}
            </div>
            
        );
    };
}



export default Home;
