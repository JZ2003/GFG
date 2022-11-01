// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. Hello World. Hello World Again. Hello World.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Projects from './pages/project';
import Login from './pages/login';
import CE_Projects from './pages/create_edit_project';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home/>} />
		<Route path='/about' element={<About/>} />
		<Route path='/project' element={<Projects/>} />
		<Route path='/login' element={<Login/>} />
		<Route path='/create_edit_project' element={<CE_Projects/>} />
	</Routes>
	</Router>
);
}

export default App;
