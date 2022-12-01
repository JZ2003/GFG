import React from 'react';
import './styles.css'

class ModBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mod: this.props.mod
        };
    }

    handleDel = () => {
        this.props.onHandleDelete(this.state.mod.modName);
    }

    render() {
        return (
            <div className="grid-container">
                <img className='icon-item' src={`data:image/jpeg;base64,${this.state.mod.icon}`}
                            alt="Mod Icon" width="100" height="100"></img>
                <a href={"http://localhost:3000/mods/" + this.state.mod.modName} className="center-item">

                        <div className="title-item">
                            <h2>{this.state.mod.modName}</h2>
                        </div><br/>
                        <div className="game-item">
                            For <b>{this.state.mod.gameName}</b>
                        </div><br/>
                        <div className="slug-item">
                            {this.state.mod.slug}
                        </div><br/>
                        <div className="tags-item">
                            Tags:&nbsp;
                            {this.state.mod.tags.map((tag) => {
                                return(
                                    <b>{tag}&nbsp;&nbsp;</b>
                                );
                            })}
                        </div><br/>
                        <div className="date-item">
                            Created at {this.state.mod.dateCreated} &nbsp;&nbsp; Updated at {this.state.mod.dateModified}
                        </div><br/>

                </a>
                <div className="right-item">
                    <b className="num-views-item">Views: {this.state.mod.views}</b><br/>
                    <b className="num-likes-item">Likes: {this.state.mod.likes}</b><br/>
                </div>
            </div>
        );
    }


}

export default ModBox;