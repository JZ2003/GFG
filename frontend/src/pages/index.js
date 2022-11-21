// import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modName: "",
            mods: [],
			displayMods: [],
			query: ""
			// user: localStorage.getItem('user'),
			// loggedIn: "false"
        };
        // this.getDB(this.state.user);
    }
	
	//	const [user, setUser] = useState('');
	//	console.log(location.state.username);
	//	console.log(username)

    async getDB (user) {
		// if(user != null){
		// 	loggedIn = true;
		// }
        await fetch('http://localhost:3030/listall', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                filter:{
                    "author": user 
                } 
            },
        })
        .then((response) => {
            if(response.status === 200){
                console.log(response.Data);
                this.state.mods = response;
                console.log("fetched");
            }
            else{
                console.log('did not succeed');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

	filterMods(regex){
		if(query.length > 0) {
		  let newMods = [...mods].filter((mod) =>regex.test(mod.modName));
		  //display filtered mods
		  this.setState({displayMods:newMods});
		} else if (query.length === 0) {
		  //display all mods
		  this.setState({displayMods:mods});
		}
	  }

	componentDidUpdate(prevProps, prevState){
		if (this.state.query !== prevState.query) {
			let regex = new RegExp(query, "i");
			filterMods(regex);
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
            </div>
            
        );
    };
}



export default Home;
