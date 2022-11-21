// import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modName: "",
            mods: []
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
        await fetch('http://localhost:3030/', {
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

    render(){
        return (
            <div>
				<h1><center>Welcome to gamersforgamers!</center></h1>
				{/* {loggedIn && <p>Welcome {user}! Checkout our mods!</p>} */}
                {/* <h2>Mod Name: {this.state.modName}</h2> */}
                
            </div>
            
        );
    };
}

export default Home;
