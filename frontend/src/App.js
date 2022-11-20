import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import My_Mods from './pages/mymods';
import Login from './pages/login_signup';
import CE_Mods from './pages/create';
import Signup from './pages/signup';
import ModView from './pages/modView';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home/>} />
		<Route path='/about' element={<About/>} />
		<Route path='/mymods' element={<My_Mods/>} />
		<Route path='/login_signup' element={<Login/>} />
		<Route path='/create' element={<CE_Mods/>} />
		<Route path='/signup' element={<Signup/>} />
		<Route path='/mods' element={<ModView/>} />
		<Route path='/mods/:modName' element={<ModPage/>} />
	</Routes>
	</Router>
);
}

function ModPage() {
	let { modName } = useParams();
	return (
		<ModView modName={modName} />
	);
}

export default App;
