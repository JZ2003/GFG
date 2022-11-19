import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const Signup = () => {

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
                    this.props.history.push({ 
                        pathname: '/about',
                        state: user
                       });
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
                        <label for="user" > Username or Email: </label><br></br>
                        <input type="text" className="form-control" value={user} onChange={(e) => setUser(e.target.value)} /><br></br>
                        <label for="pass" > Password: </label><br></br>
                        <input type="text" className="form-control" value={pass} onChange={(e) => setPass(e.target.value)} /><br></br>
                        <button type="submit">Signup</button>
                    </form>
                    {/* {emailErr && <p>Your email is invalid</p>} */}
                </center>
            </div>
        </div>
    );

};

export default Signup;