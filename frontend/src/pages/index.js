import {useLocation} from 'react-router-dom';
import {useState,useEffect} from 'react';
import React from 'react';

const Home = () => {
	const location = useLocation();
//	const [user, setUser] = useState('');
//	console.log(location.state.username);
//	console.log(username)


return (
	<div>
	<h1><center>Welcome to gamersforgamers!</center></h1>
	{location.state && location.state.username && <p>Welcome {location.state.username}! Please checkout our new mod!</p>}
	</div>
);
};

export default Home;
