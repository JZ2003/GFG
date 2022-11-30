import React from 'react';
import './styles.css'

class ModBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mod: this.props.mod
        };
    }

    render() {
        return (
            <a href={"http://localhost:3000/mods/" + this.state.mod.modName} className="modbox">
                    <img className='modIcon' 
                    src={`data:image/jpeg;base64,${this.state.mod.icon}`} 
                    alt="Mod Icon" width="100" height="100">
                    </img>
                    {/* // align the mod name to the marginTop */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <h1>{this.state.mod.modName}</h1> 
                        by {this.state.mod.author}
                    </div>
                    {/* {this.state.mod.modName} */}
                    <br/>
                    Game: {this.state.mod.gameName}
                    <br/>
                    {/* Author: {this.state.mod.author}
                    <br/> */}
                    Likes: {this.state.mod.likes}
                    <br/>
                    Views: {this.state.mod.views}
                    <br/>
                    {/* Date Created: {mod.dateCreated}
                    Date Modified: {mod.dateModified}<br/>
                    Desc: {mod.desc}<br/>
                    Tag: {mod.tag}<br/>
                    Download URL: {mod.url}<br/> */}
                    <a href={"http://localhost:3000/edit/" + this.state.mod.modName}>
                        Edit
                    </a>
            </a>
        );
    }

    
}

export default ModBox;