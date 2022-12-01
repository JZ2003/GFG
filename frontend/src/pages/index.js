import React from 'react';
import './styles.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
			displayMods: [],
            renderedItem: [],
			query: "",
            selector: "modName",
            sorter: "views",
			mods: []
        };
        // this.sortByKey = this.sortByKey.bind(this);
    }

    async sortByKey(mods,key) {
        await mods.sort((a,b) => {
            // console.log("The key now is " + key + " a[key] is "+a[key])
            if (a[key] > b[key]) {
                // console.log("return 1")
                return -1;
            } else if (a[key] < b[key]) {
                // console.log("return -1")
                return 1;
            } else {
                // console.log("return 0")
                return 0;
            }
        })
        if(key === "modName"){
            await mods.reverse();
        }
        console.log("*** displayed array after sort ***");
        this.setState({
            displayMods: mods
        });
        console.log(this.state.displayMods);
      }

    //   async updateMods(mods,key) {
    //     console.log("************************************************")
    //     await mods.sort((a,b) => {
    //         // console.log("The key now is " + key + " a[key] is "+a[key])
    //         if (a[key] > b[key]) {
    //             // console.log("return 1")
    //             return -1;
    //         } else if (a[key] < b[key]) {
    //             // console.log("return -1")
    //             return 1;
    //         } else {
    //             // console.log("return 0")
    //             return 0;
    //         }
    //     })
    //     if(key === "modName"){
    //         await mods.reverse();
    //     }
    //     console.log("*** displayed array after sort ***");
    //     this.setState({
    //         mods: mods
    //     });
    //     console.log(this.state.mods);
    //   }

    async getDB () {
        await fetch('http://localhost:3030/listall', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(res => res.json())
        .then(async (response) => {
            // console.log(response);
            if(response /*status === 200*/){
                console.log("response: " + response);
				// console.log(response.length);
                this.setState({
					mods: response.data,
                    displayMods: response.data
                });
                // this.state.mods = response;
                console.log(this.state.mods);
                console.log("displayMods: ");
                console.log(this.state.displayMods)
                
            }
            else{
                console.log('no mods associated with user');
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

	filterMods(regex){
		if(this.state.query.length > 0) {
		  let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
		  //display filtered mods
		  this.setState({displayMods:newMods});
		} else if (this.state.query.length === 0) {
		  //display all mods
		  this.setState({displayMods:this.state.mods});
		}
	  }

	async componentDidMount(){
		await this.getDB();
        this.sortByKey(this.state.mods,"views");
	}

	async componentDidUpdate(prevProps, prevState){
		if (this.state.query !== prevState.query) {
			let regex = new RegExp(this.state.query, "i");
			if(this.state.query.length > 0) {
				// console.log(this.state.mods);
                // console.log("this is the current selector state: " + this.state.selector);
                if(this.state.selector === "modName"){
                    console.log(this.state.selector)
				    let newMods = [...this.state.mods].filter((mod) => {
                        return regex.test(mod.modName);
                    });
                    await this.sortByKey(newMods,this.state.sorter)
                }
                else if(this.state.selector === "gameName"){
                    console.log(this.state.selector)
                    let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.gameName));
                    await this.sortByKey(newMods,this.state.sorter)
                }
                else if(this.state.selector === "author"){
                    console.log(this.state.selector)
                    let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.author));
                    await this.sortByKey(newMods,this.state.sorter)
                }
                else if(this.state.selector === "tag"){
                    console.log(this.state.selector)
                    let newMods = [...this.state.mods].filter((mod) => {
                        return regex.test(mod.tags.join(''))
                    });
                    await this.sortByKey(newMods,this.state.sorter)
                }
                else{
                    console.log(this.state.selector)
                    let newMods = [...this.state.mods].filter((mod) =>regex.test(mod.modName));
                    await this.sortByKey(newMods,this.state.sorter)
                }
				//display filtered mods
				// this.setState({displayMods:newMods});
			} 
            else if (this.state.query.length === 0) {
				//display all mods
				// this.setState({displayMods:this.state.mods});
                await this.sortByKey(this.state.mods,this.state.sorter);
			}
            // await this.sortByKey(this.state.displayMods,this.state.sorter)
        }
        if (this.state.sorter !== prevState.sorter) {
            console.log(this.state.sorter);
            await this.sortByKey(this.state.displayMods,this.state.sorter);
            // this.render();
        }
	}

	handleXClick(){
		console.log("delete");
        this.setState({query:""});
    }


    render(){
        return (
            <div className="container">
				<h1><center>Welcome to Gamers for Gamers!</center></h1>
            <center>
			<input 
                className="search-bar"
                key="random1"
                maxLength={60}
                value={this.state.query}
                onChange={(e) => this.setState({query:e.target.value})}
            />

            <select name="select-tag" id="options" onChange={(e) => this.setState({selector:e.target.value})} value={this.state.selector}>
                <option value="modName">mod name</option>
                <option value="gameName">game name</option>
                <option value="author">author name</option>
                <option value="tag">tags</option>
            </select>

            <select name="sort-tag" id="options" onChange={(e) => this.setState({sorter:e.target.value})} value={this.state.sorter}>
                <option value="views">views</option>
                <option value="likes">likes</option>
                <option value="modName">alphabet</option>
                <option value="dateCreated">date created</option>
            </select>


			<button onClick={() => this.handleXClick()}
                className="x-button"
            >
                X
            </button>
			</center>
			{this.state.displayMods.map((mod) => {
				return(
                    <div className="grid-container" key={mod.modName}>
                        <img className='icon-item' src={`data:image/jpeg;base64,${mod.icon}`}
                                    alt="Mod Icon" width="100" height="100"></img>
                        <a href={"http://localhost:3000/mods/" + mod.modName} className="center-item">
                            <div className="title-item">
                                <h2>{mod.modName}</h2>
                            </div><br/>
                            <div className="game-item">
                                For <b>{mod.gameName}</b>
                            </div><br/>
                            <div className="slug-item">
                                {mod.slug}
                            </div><br/>
                            <div className="tags-item">
                                Tags:&nbsp;
                                {mod.tags.map((tag) => {
                                    return(
                                        <b>{tag}&nbsp;&nbsp;</b>
                                    );
                                })}
                            </div><br/>
                            <div className="date-item">
                                Created at {mod.dateCreated} &nbsp;&nbsp; Updated at {mod.dateModified}
                            </div><br/>
                        </a>
                            <div className="right-item">
                                <b className="num-views-item">Views: {mod.views}</b><br/>
                                <b className="num-likes-item">Likes: {mod.likes}</b><br/>
                            </div>
                    </div>
				);
            })}
            </div>
            
        );
    };
}



export default Home;
