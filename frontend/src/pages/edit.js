import React from 'react';
// import {useLocation} from 'react-router-dom';
import './styles.css'

class My_Mods extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // current mod data
            modName: props.modName,
            author: '',
            desc: '',
            dateCreated: '',
            dateModified: '',
            url: '',
            gameName: '',
            tag: '',
            views: 0,
            icon: '',
            likes: 0,
            user: localStorage.getItem('user'),

            // new mod data
            currMod: '',
            currGame: '',
            currDesc: '',
            currUrl: ''
        };
        
    }

    componentDidMount(){
        this.getMod(this.state.modName);
    }


    async getMod(name){
        await fetch('http://localhost:3030/currMod?modName=' + name, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                //console.log(response);
                if(response.status >= 200 && response.status <= 204){
                    this.state.mods = response.json().then((data) => {
                        console.log(data);
                        this.setState({
                            modName: data.modName, 
                            author: data.author,
                            desc: data.desc,
                            dateCreated: data.dateCreated,
                            dateModified: data.dateCreated,
                            url: data.url,
                            gameName: data.gameName,
                            tag: data.tag,
                            views: data.views,
                            icon: data.icon,
                            likes: data.likes
                            // comments: data.comments
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

    async editMod(prevName, currName, gameName, desc, url){
        await fetch('http://localhost:3030/updateMod', {
            method: 'PUT',
            body: JSON.stringify({
                modName : prevName,
                newName : currName,
                newUrl : url,
                newDesc : desc,
                newGame : gameName
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

    handleSubmit = (e) => {
        e.preventDefault();
        if(localStorage.getItem('user') == null){
			console.log("please sign in...");
		}
		else{
			this.editMod(this.state.modName, this.state.currMod, this.state.currGame, this.state.currDesc, this.state.currUrl);
		}
    }

    render(){
        return(
            <div className="container">
            <div className="mod-container">
				<h1><center><b>Edit your mod!</b></center></h1>
                <label for="gameName"> Game Name: </label><br/>
                <input type="text" className="form-control" value={this.state.currGame} onChange={(e) => this.setState({currGame:e.target.value})} /><br/>
                <label htmlFor="modName"> Mod Name: </label><br/>
                <input type="text" className="form-control" value={this.state.currMod} onChange={(e) => this.setState({currMod:e.target.value})} /><br/>
                <label htmlFor="url"> Upload URL: </label><br/>
                <input type="url" className="form-control" value={this.state.currUrl} onChange={(e) => this.setState({currUrl:e.target.value})} /><br/>
                <label htmlFor="desc"> Description: </label><br/>
                <input type="text" size="50" maxLength="2500" className="form-control" value={this.state.currDesc} onChange={(e) => this.setState({currDesc:e.target.value})} /><br/>
                <br/>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
				
				
            	
            </div>
        </div>
        );
    };
    

}

export default My_Mods;
