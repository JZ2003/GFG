import { useState } from 'react';
import { TextField,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './styles.css'

const Signup = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    // const [emailErr, setEmailErr] = useState(false);
    // const validEmail = new RegExp(
    //     '^[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$'
    // );
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
                console.log(response);
                if(response.status >= 200 && response.status <= 204){
                    navigate('/',{state:{username:user}});
                    localStorage.setItem('user', user);
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
        console.log(user);
        console.log(pass);
        addAcc(user, pass);
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h1><center>Sign Up Here!</center></h1>
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
                        <br/>
                        <TextField
                            value={pass}
                            label="Password"
                            variant="outlined"
                            required
                            margin="normal"
                            // color="white"
                            onChange={(e) => {setPass(e.target.value);}}
                        />
                        <br/>
                        <Button type="submit" variant="contained" color="primary">
                            Signup
                        </Button>
                    </form>
                    {/* {emailErr && <p>Your email is invalid</p>} */}
                </center>
            </div>
        </div>
    );

    
};

export default Signup;