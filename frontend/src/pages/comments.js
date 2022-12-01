import React from 'react';
import './styles.css'

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modName: props.modName,
            username:"Anonymous User",
            content: "",
            comments: []
        };
    }

    componentDidMount(){
        if(localStorage.getItem('user') !== null){
			this.setState({
                username: localStorage.getItem('user')
            });
		}
        this.getMod(this.state.modName);
    }
    
    async addComments(){
        await fetch('http://localhost:3030/addComments', {
            method: 'POST',
            body: JSON.stringify({
                "comment": {
                    "content": this.state.content,
                    "username": this.state.username,
                    "modname": this.state.modName
				}
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => console.log(response))
            .catch((err) => {
                console.log(err.message);
            });
    }

    async deleteComments(){
        await fetch('http://localhost:3030/addComments', {
            method: 'DELETE',
            body: JSON.stringify({
                "comment": {
                    "content": this.state.content,
                    "username": this.state.username,
                    "modName": this.state.modName
				}
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => console.log(response))
            .catch((err) => {
                console.log(err.message);
            });
    }

    async getMod(name){
        await fetch('http://localhost:3030/currMod?modName=' + name, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if(response.status >= 200 && response.status <= 204){
                    this.state.mods = response.json().then((data) => {
                        this.setState({
                            comments:data.comments
                        });
                    });
                }
                else{
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.addComments();
        this.setState({
            comments: [
                ...this.state.comments,
                {username: this.state.username, content: this.state.content}
            ]
        });
    }

    render(){
        console.log("print comments array");
        return(
            <div className="modBody">
                {/* this part will enable comment input */}
                <div classname="modBody">
                    <label> Please leave your comments: </label>
                    <input type="text" className="form-control" onChange={(e) => this.setState({content:e.target.value})} value={this.state.content} />
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                    <br></br>
                </div>
            
                {/* /* this part forward will be comment content rendering and comment deletion */}
                {this.state.comments.map((usercontent) => {
				    return(
                        <div>
                            <br/>
                                <b>{usercontent.username}</b> commented:<br/><hr/>
                                {usercontent.content}
                        </div>
				    );
                })}
            </div>
        );
    }
    
}

export default Comments;