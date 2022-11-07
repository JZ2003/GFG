import React from 'react';

const Login = () => {
return (
	<div>
	<h1><center>Log In or Sign Up Here!</center></h1>
	<center>
		<form /* action="/backend.idk"*/>
			{/* input name attribute for backend, id is used for CSS */}
  			<label /* for="user" */> Username or Email: </label><br></br>
			<input type="text" id="user" name="user" /><br></br>
			<label /* for="pwd" */> Password: </label><br></br>
			<input type="text" id="pwd" name="pwd" /><br></br>
			<br></br>
			<input type="submit" value="Log in"/>
			<br></br>
			<input type="submit" value="Sign up"/>
		</form>	
	</center>
	</div>
);
};

export default Login;
