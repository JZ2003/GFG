import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import 'react-tagsinput/react-tagsinput.css'
import './styles.css'

function CeMods() {
    const [gameName, setGameName] = useState('');
    const [modName, setModName] = useState('');
	const [desc, setDesc] = useState('');
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState([]);
	const [slug, setSlug] = useState('');
	const current = new Date();
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

    const addMod = async (gameName, modName, slug, desc, url, tags, submittedIcon) => {
		const formData = new FormData();
		const modInfo = JSON.stringify({
			"mod": {
				"modName": modName,
				"author": localStorage.getItem('user'),
				"slug": slug,
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
				'Accept': '*/*'
			},
        })
            .then((response) => {
				if(response.status === 201){
					navigate('/');
					console.log(response)
				}
				else{
					window.alert('Mod failed to upload...');
				}
			})
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
			addMod(gameName, modName, slug, desc, url, tags, submittedIcon);
		}
    };

	const handleTagsChange = (tags) => {
		setTags(tags)
	};

	function SubmitButton(){
		if (gameName && modName && desc && url && tags){
		  return <button type="submit">Submit</button>
		} else {
		  return <button type="submit" disabled>Submit</button>
		};
	};

    return (
        <div className="container">
            <div className="mod-container">
				<h1><center><b>Create your mod!</b></center></h1>
				<form onSubmit={handleSubmit(onSubmit)} id="create-form">
					<label for="gameName"> Game Name: </label><br/>
					<input type="text" className="form-control" value={gameName} onChange={(e) => setGameName(e.target.value)} /><br/>
					<label htmlFor="modName"> Mod Name: </label><br/>
					<input type="text" className="form-control" value={modName} onChange={(e) => setModName(e.target.value)} /><br/>
					<label for="tags"> Tags: </label><br/>
					<TagsInput value={tags} onChange={handleTagsChange} onlyUnique={true} className="input"/>
					<label htmlFor="url"> Upload URL: </label><br/>
					<input type="url" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} /><br/>
					<label htmlFor="slug"> Short Summary: </label><br/>
					<textarea rows="5" cols="50" className="form-slug" maxlength="50" value={slug} onChange={(e) => setSlug(e.target.value)}>
						Enter a short description of 50 characters or less:
					</textarea><br/>
					<label htmlFor="desc"> Description: </label><br/>
					<textarea rows="5" cols="50" className="form-desc" maxlength="2500" value={desc} onChange={(e) => setDesc(e.target.value)}>
						Enter a description:
					</textarea><br/>
					<label for="icon"> Upload icon: </label><br/>
					<input type="file" {...register("file")}/>
					<br/>
					<SubmitButton />
				</form>
				
				
				{/* <input type="textarea" rows="10" cols="50" size="50" maxLength="2500" className="form-desc" value={desc} onChange={(e) => setDesc(e.target.value)} /><br/> */}
            	
            </div>
        </div>
    );
};

export default CeMods;
