const fs = require('fs');
const ModsDB = require('./database/modsDatabase.js');
const { getLogger } = require('./logUtil.js');
const logger = getLogger('ModsAPI');

/**
 * This is handy for striped out some outdated data
 * Use this before you insert dummy
 */
 function handleRemoveAllRequest(req, res) {
  ModsDB.removeAll().then(() => {
    res.end();
  })
}

/**
 * This can be used to initialize some data in database
 */
function handleinsertDummyMods(req, res){
  ModsDB.insertDummyMods(10).then((succeed) => {
    if (succeed) {
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 409;
      res.end("Database non empty");
    }
  })
}

/**
 * 
 * @param {mod} oldMod 
 * @returns a new copy of the old mod
 */
function copyMod(oldMod){
  let newMod = new ModsDB.Mod(
    oldMod["modName"],
    oldMod["author"],
    oldMod["desc"],
    oldMod["dateCreated"],
    oldMod["dateModified"],
    oldMod["url"],
    oldMod["gameName"],
    oldMod["tags"],
    oldMod["views"],
    oldMod["icon"],
    oldMod["likes"],
    oldMod["comments"],
    oldMod["slug"]
  );
  return newMod;
}

/**
 * This handles the upload mod POST request.
 * @param {Request} req
 * The request must be given a multipart/form-data body with the following fields:
 * - image: the image file
 * - modinfo: a JSON string containing the mod info @see ModsDB.Mod
 * @param {Response} res
 * Response code: 
 * 200 if the mod was uploaded successfully,
 * 409 if the mod already exists
 */
function handleUploadReqeust(req, res) {
  let req_data = JSON.parse(req.fields.modinfo);
  let newModInfo = {};
  // This handles over stringified data...
  if (typeof req_data === "string") {
    newModInfo = JSON.parse(req_data).mod;
  } else {
    newModInfo = req_data.mod;
  }

  // Uncomment this to handle the restricted game set thing
  // ------------------------------------------------------
  // possible_game = ["Minecraft", "Terraria"];
  // if (!(newModInfo["gameName"] in possible_game)){
  //   res.statusCode = 409;
  //   res.send("This game doesn't exist");
  // }
  const image_path = '../images';
  const imageName = newModInfo.modName + '.png';
  let new_path = image_path + '/' + imageName;
  let newMod = copyMod(newModInfo);
  base64_image = fs.readFileSync(req.files.image.path, {encoding:'base64'});
  newMod.icon = base64_image;
  ModsDB.insert(newMod).then((canInsert) => {
    if (canInsert) {
      // TODO: Remove this because we now use base64
      fs.readFile(req.files.image.path, function (err, data) {
        fs.writeFile(new_path, data, function(err) {
          logger.error(err);
        })
      })
      logger.info("Succeeded to handle upload request");
      res.statusCode = 201;
      res.send(new_path);
    } else {
      logger.warn("Failed to handle upload request");
      res.statusCode = 409;
      res.end();
    }
  })
}

function handleDeleteModRequest(req, res) {
  const { headers } = req;
  modName = headers.modName;

  ModsDB.remove(modName).then((canRemove) => {
    if (canRemove) {
      logger.info("Succeeded to handle delete request");
      res.statusCode = 204;
      res.end();
    } else {
      logger.warn("Failed to handle delete request");
      res.statusCode = 409;
      res.write("Failed");
      res.end();
    }
  })
}

function handleGetModRequest(req, res) {
  const baseURL = 'http://' + req.headers.host + '/';
  const url = new URL(req.url, baseURL);
  const queryObject = url.searchParams;
  const modName = queryObject.get('modName');
  ModsDB.find(modName).then((data) => {
    if (data == null) {
      logger.warn("Failed to handle get mod request");
      res.statusCode = 404;
      res.write("Mod does not exist");
      res.end();
    } else {
      logger.info("Succeeded to handle get mod request");
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify(data));
    }
  })
}

function handleGetAllRequest(req, res) {
  ModsDB.getAll().then((data) => {
    if (data === null) {
      logger.warn("Failed to handle get all request");
      res.statusCode = 404;
      res.write("Empty");
      res.end();
    } else {
      logger.info("Succeeded to handle get all request");
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify({data}));
    }
  })
}
/**
 * This function means to give the right result by filtering, except for 
 * filtering by TAGS
 */
function handleFilterRequest(req, res) {
    let filter = req.headers.filter;
    let obj = JSON.parse(filter);
    ModsDB.search(obj).then((data) =>
    {
      if(data.length === 0){
        logger.warn("Failed to handle filter request");
        res.statusCode = 404;
        res.write("Can't find any mod with this filter");
        res.end();
      }
      else{
        logger.info("Succeeded to handle filter request");
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        // Give all matched mods, and the number of matching
        // set the body with the result
        res.end(JSON.stringify(data, "num", data.length));
      }
    })
}
/**
 * This function means to give the right result by filtering by TAGS
 */
function handleFilterTagRequest(req,res){
  let result = [];
  let tag = req.headers.tag;
  console.log(JSON.parse(tag)["tag"][0])
  let tag_len = tag.length;
  ModsDB.getAll().then((data) =>
  {
    let data_len = data.length;
    for(let i = 0; i < data_len; i ++){
      let bool = true;
      for(let j = 0; j < tag_len; j ++){
        if(!data[i].tag.includes(tag[j])){
          bool = false;
          break;
        }
      }
      if(bool){
        result.push(data[i]);
      }
    }
    if(result.length === 0){
      logger.warn("Failed to handle filter tag request");
      res.statusCode = 404;
      res.write("Can't find any mod with these tag filters");
      res.end();
    }
    else{
      logger.info("Succeeded to handle filter tag request");
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify({result, "num":result.length})); 
    }
  })
}

/**
 * This function means to change basic information of a mod, including: name,
 * URL, slug, and description.
 * USE: use BODY in such way:
 * modName : <name of the mod> (optional)
 * newName : <new name> (optional)
 * newUrl : <new URL> (optional)
 * newDesc : <new description> (optional)
 * newGame : <new game name> (optional)
 * newSlug : <new slug> (optional)
 */
function handleUpdateRequest(req,res){
  let modName = req.fields["modName"];
  ModsDB.find(modName).then((mod) =>{
    if(mod === null){
      res.statusCode = 404;
      res.write("Can't find this mod!");
      res.end();
    }
    else{
      let currMod = copyMod(mod);
      if(req.fields["newName"] !== undefined){
        currMod["modName"] = req.fields["newName"];
      }
      if(req.fields["newUrl"] !== undefined){
        currMod["url"] = req.fields["newUrl"];
      }
      if(req.fields["newDesc"] !== undefined){
        currMod["desc"] = req.fields["newDesc"];
      }
      if(req.fields["newGame"] !== undefined){
        currMod["gameName"] = req.fields["newGame"];
      }
      if(req.fields["newSlug"] !== undefined){
        currMod["slug"] = req.fields["newSlug"];
      }
      ModsDB.update(modName,currMod).then((success)=>{
        if(success){
          logger.info("Succeeded to handle update mod request");
          res.statusCode = 204;
          res.end();
        }
        else{
          logger.warn("Failed to handle update mod request");
          res.statusCode = 404;
          res.end("Failed for some reason.Probably the new name already existed.");
        }
      })
    }
  })
}

/**
 *  USE: use BODY in such way: 
 *  add : List<string> of tags to be added
 *  delete : List<string> of tags to be deleted
 *  modName : <name of the mod>
 */
function handleUpdateTag(req, res){
  let addList = req.fields["add"];
  let deleteList = req.fields["delete"];
  let modName = req.fields["modName"];
  ModsDB.find(modName).then((mod) => {
    if(mod !== null){
      let currMod = copyMod(mod); // Copy the mod
      // delete currMod["_id"]; // remove the id part
      // console.log(currMod);
      let newTags = currMod.tags;
      // First, we remove all tags that need to be deleted
      let delete_len = deleteList.length;
      for(let i = 0; i < delete_len; i ++){
        let index = newTags.indexOf(deleteList[i]);
        // If such a tag exists in the old list, we delete it
        if(index > -1){
          newTags.splice(index,1);
        }
      }
      // Second, let's add all new tags
      let add_len = addList.length;
      for(let i = 0; i < add_len; i ++){
        // If the tag is indeed new, we add it
        if(newTags.indexOf(addList[i]) <= -1){
          newTags.push(addList[i]);
        }
      }
      currMod.tags = newTags;
      ModsDB.update(modName,currMod).then((success)=>{
        if(success){
          logger.info("Succeeded to handle update tag request");
          res.statusCode = 204;
          res.end();
        }
        else{
          logger.warn("Failed to handle update tag request");
          res.statusCode = 404;
          res.write("Failed for some unclear reason");
        }
      })
    }
    // If we can't find such modName, we write 404
    else{
      logger.warn("Failed to handle update tag request");
      res.statusCode = 404;
      res.write("Can't find this mod!");
      res.end();
    }
  })
}

/**
 *  USE: use headers in such way: 
 *  modName : <name of the mod>
 */
function handleUpdateView(req, res){
  modName = req.headers.modname;
  ModsDB.find(modName).then((mod) => {
    currMod = copyMod(mod);
    currMod["views"] = currMod["views"] + 1;
    ModsDB.update(modName, currMod).then((success) => {
      if (success) {
        logger.info("Succeeded to handle update view request");
        res.statusCode = 204;
        res.end();
      } else {
        logger.warn("Failed to handle update view request");
        res.statusCode = 409;
        res.end();
      }
    })
  })
}

/**
 *  USE: use headers in such way: 
 *  change : -1 OR add : 1
 *  modName : <name of the mod>
 */
function handleUpdateLikes(req, res) {
  res.end();
  modName = req.headers.modname;
  add = req.headers.change;
  ModsDB.find(modName).then((mod) => {
    currMod = copyMod(mod);
    if (add === '1') {
      currMod["likes"] = currMod["likes"] + 1;
    } else {
      currMod["likes"] = currMod["likes"] - 1;
    }
    ModsDB.update(modName, currMod).then((success) => {
      if (success) {
        logger.info("Succeeded to handle update likes request");
        console.log("log Robin")
        res.statusCode = 200;
        res.end();
      } else {
        logger.warn("Failed to handle update likes request");
        res.statusCode = 409;
        res.end();
      }
    })
  })
}

function handleGetAllTag(req, res) {
  ModsDB.getAll().then((allMods) => {
    tagSet = new Set()
    for (let i = 0; i < allMods.length; i++) {
      for (let j = 0; j < allMods[i].tag.length; j++) {
        tagSet.add((allMods[i].tag)[j]);
      }
    }
    let tagArr = Array.from(tagSet);
    logger.info("Succeeded to handle get all tag request");
    res.statusCode = 204;
    res.json({"tag":tagArr});
    res.end();
  }).catch(() => {
    logger.warn("Failed to handle get all tag request");
    res.statusCode = 404;
    res.end();
  })
}

/**
 * This function is designed to handle request like this
 * 
 * Method: POST
 * 
 * In body, passed json data formatted like
 * 
 * {
 *   "comment": {
 *      "content": "Hello random",
 *      "username": "Random Dummy",
 *      "modname": "Dummy Mod 0"
 *   }
 * }
 * 
 * with the the thing after the colon being changed to actual data
 */
function handlePostCommentRequest(req, res) {
  // console.log(req.fields);
  const comment = req.fields.comment.content;
  const username = req.fields.comment.username;
  const modname = req.fields.comment.modname;
  ModsDB.find(modname).then((mod) => {
    let new_mod = copyMod(mod);
    // console.log(new_mod)
    new_mod.addComment(username, comment);
    ModsDB.update(modname, new_mod).then((success) => {
      if (success) {
        logger.info("Succeeded to handle post comment request");
        res.statusCode = 201;
        res.end();
      } else {
        logger.warn("Failed to handle post comment request with known reason");
        res.statusCode = 409;
        res.end("Failed with known reason");
      }
    }).catch(() => {
      logger.warn("Failed to handle post comment request with unknown reason");
      res.statusCode = 500;
      res.end("Failed with unknown reason");
    })
  })
}

/**
 * Usage: exactly the same with above
 * Except change POST to DELETE
 */
function handleDeleteCommentRequest(req, res) {
  const comment = req.fields.comment.content;
  const username = req.fields.comment.username;
  const modname = req.fields.comment.modname;
  ModsDB.find(modname).then((mod) => {
    let new_mod = copyMod(mod);
    const comments = new_mod.comments;
    let new_comments = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].username !== username || comments[i].content !== comment) {
        new_comments.push(comments[i]);
      }
    }
    new_mod.comments = new_comments;
    ModsDB.update(modname, new_mod).then((success) => {
      if (success) {
        logger.info("Succeeded to handle delete comment request");
        res.statusCode = 204;
        res.end();
      } else {
        logger.warn("Failed to handle delete comment request with known reason");
        res.statusCode = 409;
        res.end("Failed with unknown reason");
      }
    }).catch(() => {
      logger.warn("Failed to handle delete comment request with unknown reason");
      res.statusCode = 500;
      res.end("Failed with unknown reasons");
    })
  })
}

/**
 * I think maybe this will be somewhat handy
 * 
 * Manual for Usage:
 * 
 * Method: Get
 * Headers: username: data
 * 
 * Returned value:
 * Json objects, where "comments" has value of
 * a list where each element is a json objects
 * containing key with modname and value of comments
 * written by user for this mod.
 * 
 * {
 *   "comments": [
 *      {
 *         "Dummy Mod 0":[
 *             "Dummy Comment1"
 *         ]
 *      },
 *      {
 *         "Dummy Mod 1":[
 *             "Dummy Comment1"
 *          ]
 *      }
 * }
 */
function handleGetCommentsForUser(req, res) {
  const username = req.headers.username;
  ModsDB.getAll().then((allMods) => {
    let comments = [];
    for (let i = 0; i < allMods.length; i++) {
      let subComment = [];
      for (let j = 0; j < allMods[i].comments.length; j++) {
        if (allMods[i].comments[j].username === username) {
          subComment.push(allMods[i].comments[j].content);
        }
      }
      if (subComment.length > 0){
        let commentObj = {};
        modName = allMods[i].modName;
        commentObj[modName] = subComment;
        comments.push(commentObj);
      }
    }
    res.json({"comments": comments});
    res.end();
  })
}

/**
 * Need more things here
 */
function handleGetAllGame(req, res) {
  possible_game = ["Minecraft", "Terraria"];
  res.json({"Games":possible_game});
}

module.exports = { handleUploadReqeust, handleGetModRequest, handleGetAllRequest, handleDeleteModRequest, handleFilterRequest,
  handleFilterTagRequest,handleUpdateRequest, handleRemoveAllRequest, handleUpdateView, handleGetAllTag, handleUpdateLikes, handleGetAllGame,handleUpdateTag,
  handleinsertDummyMods, handlePostCommentRequest, handleDeleteCommentRequest, handleGetCommentsForUser };
