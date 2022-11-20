import React, { useState } from 'react';
import { TextField,Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const validEmail = new RegExp(
        '^[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$'
     );

    const log_Acc = async (user, pass) => {
        await fetch('http://localhost:3030/login?user=' + user + '&pass=' + pass, {
            method: 'GET',
            // body: JSON.stringify({
            //     user: '',
            //     pass: ''
            // }),
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
        if (!validEmail.test(user)) {
            setEmailErr(true);
         }
        log_Acc(user, pass);
        console.log(user);
        console.log(pass);
    };

    return (
        <div className="login">
            <div className="login-container">
                <h1><center>Log in or Sign Up Here!</center></h1>
                <center>
                    <form onSubmit={handleSubmit}>
                    <TextField
                            value={user}
                            label="Username or Email"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={(e) => {setUser(e.target.value);}}
                        />
                        <br></br>
                        <TextField
                            value={pass}
                            label="Password"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={(e) => {setPass(e.target.value);}}
                        />
                        <br></br>
                        <Button type="submit" variant="contained" color="primary">
                            Log in
                        </Button>
                    </form>
                    {/* {emailErr && <p>Your email is invalid</p>} */}
					
					<Link to="/signup">
						Sign Up
        			</Link>
                </center>
            </div>
        </div>
    );
};


export default Login;
