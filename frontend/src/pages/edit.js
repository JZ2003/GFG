import React from 'react';
import TagsInput from 'react-tagsinput';
import './styles.css'
import 'react-tagsinput/react-tagsinput.css'
import {Navigate} from "react-router-dom"


class Edit extends React.Component{    
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
            tags: [],
            views: 0,
            icon: '',
            likes: 0,
            user: localStorage.getItem('user'),
            slug: '',

            // new mod data
            currMod: '',
            currGame: '',
            currDesc: '',
            currUrl: '',
            currSlug: '',
            currTags: [],
            currIcon: '',

            //navigate
            redirect:false
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
                            likes: data.likes,
                            slug: data.slug,
                            currGame: data.gameName,
                            currMod: data.modName,
                            currDesc: data.desc,
                            currUrl: data.url,
                            currSlug: data.slug,
                            currTags: data.tags,
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

    async editMod(){
        const current = new Date();
        console.log("newTags", this.state.currTags);
        await fetch('http://localhost:3030/updateMod', {
            method: 'PUT',
            body: JSON.stringify({
                modName : this.state.modName,
                newName : this.state.currMod,
                newUrl : this.state.currUrl,
                newDesc : this.state.currDesc,
                newGame : this.state.currGame,
                newTags : this.state.currTags,
                newSlug : this.state.currSlug,
                dateModified: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
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
			this.editMod();
            this.setState({redirect:true});
		}
    }

    handleTagsChange = (tags) => {
		this.setState({currTags: tags});
	};

    render(){
        return(
            <div className="container">
            <div className="mod-container">
				<h1><center><b>Edit your mod!</b></center></h1>
                <label for="gameName"> Game Name: </label><br/>
                <input type="text" className="form-control" value={this.state.currGame} onChange={(e) => this.setState({currGame:e.target.value})} /><br/>
                <label htmlFor="modName"> Mod Name: </label><br/>
                <input type="text" className="form-control" value={this.state.currMod} onChange={(e) => this.setState({currMod:e.target.value})} /><br/>
                <label for="tags"> Tags: </label><br/>
				<TagsInput value={this.state.currTags} onChange={this.handleTagsChange} onlyUnique={true} className="input"/>
				
                <label htmlFor="url"> Upload URL: </label><br/>
                <input type="url" className="form-control" value={this.state.currUrl} onChange={(e) => this.setState({currUrl:e.target.value})} /><br/>
                <label htmlFor="slug"> Short Summary: </label><br/>
					<textarea rows="5" cols="50" className="form-slug" maxlength="50" value={this.state.currSlug} onChange={(e) => this.setState({currSlug:e.target.value})}>
						Enter a short description of 50 characters or less:
					</textarea><br/>

				<label htmlFor="desc"> Description: </label><br/>
					<textarea rows="5" cols="50" className="form-desc" maxlength="2500" value={this.state.currDesc} onChange={(e) => this.setState({currDesc:e.target.value})}>
						Enter a description:
					</textarea><br/>

                <button type="submit" onClick={this.handleSubmit}>Submit</button>
                {this.state.redirect && <Navigate to="/mymods" replace={true}/>}
            </div>
        </div>
        );
    };
    

}

export default Edit;
