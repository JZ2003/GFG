import { useState } from 'react';
import { TextField,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './styles.css'

const Signup = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const loggedIn = localStorage.getItem('user');

    const addAcc = async (user, pass) => {
        if(loggedIn != null){
            window.alert("You are already signed into an account!");
        }
        await fetch('http://localhost:3030/signup', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                pass: user
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                username: user,
                password: pass
            },
        })
            .then((response) => {
                if(response.status >= 200 && response.status <= 204){
                    navigate('/',{state:{username:user}});
                    localStorage.setItem('user', user);
                }
                else{
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAcc(user, pass);
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h1><center>Sign Up Here!</center></h1>
                <center>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ input: { color: 'white' } }}
                            value={user}
                            label="Username or Email"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={(e) => {setUser(e.target.value);}}
                        />
                        <br/>
                        <TextField
                            sx={{ input: { color: 'white' } }}
                            value={pass}
                            label="Password"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={(e) => {setPass(e.target.value);}}
                        />
                        <br/>
                        <Button type="submit" variant="contained" color="primary">
                            Signup
                        </Button>
                    </form>
                </center>
            </div>
        </div>
    );

    
};

export default Signup;