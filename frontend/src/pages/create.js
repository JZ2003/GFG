import React, { useState } from 'react';
import TagsInput from 'react-tagsinput'; // https://www.npmjs.com/package/react-tagsinput
import 'react-tagsinput/react-tagsinput.css'
import './styles.css'
import { useForm } from "react-hook-form";

// import moment from "moment";

function CE_Mods() {
    const [gameName, setGameName] = useState('');
    const [modName, setModName] = useState('');
	const [desc, setDesc] = useState('');
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState([]);
	const current = new Date();
	const { register, handleSubmit } = useForm();

    const addMod = async (gameName, modName, desc, url, tags, submittedIcon) => {
		const formData = new FormData();
		const modInfo = JSON.stringify({
			"mod": {
				"modName": modName,
				"author": localStorage.getItem('user'),
				"desc": desc,
				"url": url,
				"gameName": gameName,
				"tags": tags,
				"views": 0,
				"icon": "placeholder",
				"dateCreated": `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
				"dateModified": `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
				"likes": 0,
				"comments": []
			}
		})
        formData.append("image", submittedIcon);
		formData.append("modinfo", modInfo);

        await fetch('http://localhost:3030/createMod', {
            method: 'POST',
			body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
				// 'Content-Length': '<calculated when request is sent>',
				'Accept': '*/*'
			},
        })
            .then((response) => console.log(response))
            .catch((err) => {
                console.log(err.message);
            });
    };

    const onSubmit = async (data) => {
		const submittedIcon = data.file[0];
        // e.preventDefault();
		if(localStorage.getItem('user') == null){
			console.log("please sign in...");
		}
		else{
			addMod(gameName, modName, desc, url, tags, submittedIcon);
		}
    };

	const handleTagsChange = (tags) => {
		setTags(tags)
	}

    return (
        <div className="container">
            <div className="mod-container">
				<h1><center><b>Create/Edit your mod!</b></center></h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label for="gameName"> Game Name: </label><br/>
					<input type="text" className="form-control" value={gameName} onChange={(e) => setGameName(e.target.value)} /><br/>
					<label htmlFor="modName"> Mod Name: </label><br/>
					<input type="text" className="form-control" value={modName} onChange={(e) => setModName(e.target.value)} /><br/>
					{/* <label for="tags"> Tags: </label><br/>
					<input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)}/><br/>*/}
					<label htmlFor="tags"> Tags: </label><br/>
					<TagsInput value={tags} onChange={handleTagsChange} onlyUnique={true}/>
					<label htmlFor="url"> Upload URL: </label><br/>
					<input type="url" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} /><br/>
					<label htmlFor="desc"> Description: </label><br/>
					<input type="text" size="50" maxLength="2500" className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} /><br/>
					<label for="icon"> Upload icon: </label><br/>
					<input type="file" {...register("file")}/>
					<br/>
					<button type="submit">Submit</button>
				</form>
				
            	
            </div>
        </div>
    );
};

export default CE_Mods;
