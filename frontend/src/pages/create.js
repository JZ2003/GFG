import React, { useState } from 'react';
// import moment from "moment";

function CE_Mods() {

	// * @param {string} modName - name of the mod
	// * @param {string} author - author username of the mod
	// * @param {string} desc - description of the mod
	// * @param {string} dateCreated - date of creation of the mod
	// * @param {string} dateModified - date of modification of the mod
	// * @param {string} url - download link of the mod
	// * @param {string} gameName - name of the game the mod is for
	// * @param {List<string>} tags - tags of the mod
	// * @param {int} views - number of views of the mod
	// * @param {string} icon - path to the icon image of the mod

    const [gameName, setGameName] = useState('');
    const [modName, setModName] = useState('');
	const [author, setAuthor] = useState('');
	const [desc, setDesc] = useState('');
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState('');
	const [dateCreated, setDate] = useState('');
	const current = new Date();

    const addMod = async (gameName, modName, author, desc, url, tags) => {
		console.log(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
        await fetch('http://localhost:3030/createMod', {
            method: 'POST',
            body: JSON.stringify({
                "mod": {
					"modName": modName,
					"author": author,
					"desc": desc,
					"url": url,
					"gameName": gameName,
					"tag": tags,
					"dateCreated": `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addMod(gameName, modName, author, desc, url, tags);
    };

    return (
        <div className="make-mod">
            <div className="mod-container">
				<h1><center><b>Create/Edit your mod!</b></center></h1>
				<form onSubmit={handleSubmit}>
					<label for="gameName"> Game Name: </label><br/>
					<input type="text" className="form-control" value={gameName} onChange={(e) => setGameName(e.target.value)} /><br/>
					<label for="modName"> Mod Name: </label><br/>
					<input type="text" className="form-control" value={modName} onChange={(e) => setModName(e.target.value)} /><br/>
					<label for="author"> Author: </label><br/>
					<input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} /><br/>
					<label for="tags"> Tags: </label><br/>
					<input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)}/><br/>
					<label for="url"> Upload URL: </label><br/>
					<input type="url" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} /><br/>
					<label for="desc"> Description: </label><br/>
					<input type="text" size="50" maxLength="2500" className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} /><br/>
					<br/>
					<button type="submit">Submit</button>
				</form>
            </div>
        </div>
    );
};

export default CE_Mods;
