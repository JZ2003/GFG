import React from 'react';

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modName: props.modName,
            username:"Anonymous User",
            content: "",
            comments: [
                // {username: "sunny", content: "hahaha"},
                // {username: "anonymous", content: "so boring"}
            ]
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

    // async getComments(name){
    //     await fetch('http://localhost:3030/getUserComments' + name, {
    //         method: 'GET',
    //         // body: JSON.stringify({
    //         //     user: '',
    //         //     pass: ''
    //         // }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => {
    //             //console.log(response);
    //             if(response.status >= 200 && response.status <= 204){
    //                 this.state.mods = response.json().then((data) => {
    //                     console.log(data);
    //                     for (let i = 0; i < data.comments.length; i++) {
    //                         if (data.comments[i].hasOwnProperty(this.state.modName)){
    //                             this.setState({
    //                                 comments:data.comments[i]
    //                             });
    //                         }else{
    //                             this.setState({
    //                                 comments:"no comments yet"
    //                             });
    //                         }
    //                     } 
    //                 });
    //             }
    //             else{
    //                 console.log('did not succeed lol');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // };
    
    async addComments(){
        console.log("hi")
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

    // might have errors
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
                    console.log('did not succeed lol');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

<<<<<<< HEAD
    handleSubmit(){
        console.log("repeat this")
        console.log(this)
=======
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this);

>>>>>>> 1ec781ad48af54e387f42c3abcc53f7e14410622
        this.addComments();
        console.log("updated this");
        this.setState({
            comments: [
                ...this.state.comments,
                {username: this.state.username, content: this.state.content}
            ]
        });
    }

    handleDelete(){
        // *** not done yet ***
        this.deleteComments();
    }

    // componentDidUpdate(prevProps, prevState){
	// 	if (this.state.content !== prevState.content) {
			
	// 	  }
	// }

    render(){
        console.log("print comments array");
        return(
            <div>
<<<<<<< HEAD
                this part will enable comment input
                
					<label> Please leave your comments: </label>
					<input type="text" className="form-control" onChange={(e) => this.setState({content:e.target.value})} value={this.state.content} />
					<button type="submit" onClick={() => this.handleSubmit()}>Submit</button>
				 <br></br>
=======
                {/* this part will enable comment input */}
                
                <label> Please leave your comments: </label>
                <input type="text" className="form-control" onChange={(e) => this.setState({content:e.target.value})} value={this.state.content} />
                <button type="submit" onClick={this.a}>Submit</button>
				<br></br>
>>>>>>> 1ec781ad48af54e387f42c3abcc53f7e14410622
                
                {/* /* this part forward will be comment content rendering and comment deletion */}
                {this.state.comments.map((usercontent) => {
				    return(
                        <div>
                            <>
                                user {usercontent.username} left this comment: {usercontent.content}
                            </>
                        </div>
				    );
                })}
            </div>
        );
    }
    
}

export default Comments;