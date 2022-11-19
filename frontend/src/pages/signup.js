import { useState, useEffect } from 'react';
import React from 'react';

function Signup() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const validEmail = new RegExp(
        '^[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$'
     );

    const addAcc = async (user, pass) => {
        await fetch('http://localhost:3030/signup', {
            method: 'POST',
            body: JSON.stringify({
                user: '',
                pass: ''
                // title: '',
                // body: '',
                // userId: Math.random().toString(36).slice(2)
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                username: user,
                password: pass
            },
        })
            .then((response) => console.log(response))
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validEmail.test(user)) {
            setEmailErr(true);
         }
        addAcc(user, pass);
        console.log(user);
        console.log(validEmail.test(user));
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <h1><center>Sign Up Here!</center></h1>
                <center>
                    <form onSubmit={handleSubmit}>
                        <label for="user" > Username or Email: </label><br />
                        <input type="text" className="form-control" value={user} onChange={(e) => setUser(e.target.value)} /><br />
                        <label for="pass" > Password: </label><br />
                        <input type="text" className="form-control" value={pass} onChange={(e) => setPass(e.target.value)} /><br />
                        <button type="submit">Sign Up</button>
                    </form>
                    {emailErr && <p>Your email is invalid</p>}
                </center>
            </div>
        </div>
    );

};

export default Signup;