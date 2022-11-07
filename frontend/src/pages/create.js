import React from 'react';

const CE_Mods = () => {
return (
	<div>
		<h1><center><b>Create/Edit your mod!</b></center></h1>
		<form /* action="/backend.idk"*/>
			{/* input name attribute for backend, id is used for CSS */}
  			<label /* for="gname" */> Game Name: </label><br></br>
			<input type="text" id="gname" name="gname" /><br></br>
			<label /* for="mname" */> Mod Name: </label><br></br>
			<input type="text" id="mname" name="mname" /><br></br>
			<label /* for="Tags" */> Tags: </label><br></br>
			<input type="text" id="tags" name="tags" value="separate with ;"/><br></br>
			<label /* for="URL" */> Upload URL: </label><br></br>
			<input type="url" id="url" name="url" /><br></br>
			<label /* for="Description" */> Description: </label><br></br>
			<input type="text" id="desc" name="desc" size="50" maxLength="2500"/><br></br>
			<br></br>
			<input type="submit" value="submit"/>
		</form>
	</div>
);
};

export default CE_Mods;
