import React, { useState } from 'react';
import { TextField,Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './styles.css'


function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    // const [emailErr, setEmailErr] = useState(false);
    // const validEmail = new RegExp(
    //     '^[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$'
    // );
    // const[signedIn, setSignedIn] = usestate(false);
    const loggedIn = localStorage.getItem('user');

    const log_Acc = async (user, pass) => {
        if(loggedIn != null){
            window.alert("You are already signed in!");
        }
        await fetch('http://localhost:3030/login?user=' + user + '&pass=' + pass, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                username: user,
                password: pass
            },
        })
            .then((response) => {
                console.log(response);
                if(response.status >= 200 && response.status <= 204){
                    localStorage.setItem('user', user);
                    navigate('/',{state:{username:user}});
                }
                else{
                    console.log('did not succeed lol');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!validEmail.test(user)) {
        //     setEmailErr(true);
        //  }
        log_Acc(user, pass);
        console.log(user);
        console.log(pass);
    };

    const logOut = (e) => {
        e.preventDefault();
        console.log('Logout');

        localStorage.clear();
        sessionStorage.clear();

        navigate("/");
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1><center>Log in or Sign Up Here!</center></h1>
                <center>
                    <form onSubmit={handleSubmit}>
                    <TextField
                            sx={{ input: { color: 'white' } }}
                            InputLabelProps={{style : {color : 'grey'} }}
                            value={user}
                            label="Username or Email"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={(e) => {setUser(e.target.value);}}
                        />
                        <br></br>
                        <TextField
                            sx={{ input: { color: 'white' } }}
                            InputLabelProps={{style : {color : 'grey'} }}
                            value={pass}
                            label="Password"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={(e) => {setPass(e.target.value);}}
                        />
                        <br/>
                        <br/>
                        <Button type="submit" variant="contained" color="primary">
                            Log in
                        </Button>
                    </form>
					<br/>
					<Link to="/signup">
						No account? Sign up here
        			</Link>
                    <br/>
                    <br/>
                    <Button onClick={logOut} variant="contained" color="primary">
                            Log out
                    </Button>
                </center>
            </div>
        </div>
    );
};


export default Login;
