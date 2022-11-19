const ModsDB = require('./database/modsDatabase.js');

// function handleUploadReqeust(req, res) {
//   const { headers } = req;
//   const Mod = headers.mod;
  
//   ModsDB.insert(Mod).then((canInsert) => {
//     if (canInsert) {
//       res.statusCode = 201;
//       res.end();
//     } else {
//       res.statusCode = 409;
//       res.write("Alreday existed");
//       res.end();
//     }
//   });
// }

function handleUploadReqeust(req, res) {
  console.log("log1");
  // const { headers } = req;
  // const Mod = headers.mod;
  let arr = [];
  req.on("data", (chunk) => {
    arr.push(chunk);
  })
  console.log("log3");
  req.on("end",()=>{
    console.log("log5");
    let newModInfo = JSON.parse(arr)["mod"];
    let newMod = new ModsDB.Mod(
      newModInfo["modName"],
      newModInfo["author"],
      newModInfo["desc"],
      newModInfo["dateCreated"],
      newModInfo["dateModified"],
      newModInfo["url"],
      newModInfo["gameName"],
      newModInfo["tag"],
      newModInfo["views"],
      newModInfo["icon"]
    );
    console.log("log4");
    ModsDB.insert(newMod).then((canInsert) => {
      console.log("log2");
      if (canInsert) {
        res.statusCode = 201;
        res.end();
      } else {
        res.statusCode = 409;
        res.write("Alreday existed");
        res.end();
      }
    });
  })
}

function handleDeleteModRequest(req, res) {
  const { headers } = req;
  modName = headers.modName;

  ModsDB.remove(modName).then((canRemove) => {
    if (canRemove) {
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 409;
      res.write("Failed");
      res.end();
    }
  })
}

function handleRemoveAllRequest(req, res) {
  ModsDB.removeAll();
}

// function handleChangeModRequest(req, res) {
//   const { headers } = req;
//   to_be_update = headers.modName;
//   update = headers.mod;

//   ModsDB.update(to_be_update, update).then((canUpdate) => {
//     if (canUpdate) {
//       res.statusCode = 204;
//       res.end();
//     } else {
//       res.statusCode = 409;
//       res.write("Modname does not exist or new mod name conflict");
//       res.end();
//     }
//   })
// }

function handleGetModRequest(req, res) {
  const baseURL = 'http://' + req.headers.host + '/';
  const url = new URL(req.url, baseURL);
  const queryObject = url.searchParams;
  const modName = queryObject.get('modName');
  console.log(modName);
  ModsDB.find(modName).then((data) => {
    if (data == null) {
      res.statusCode = 404;
      res.write("Mod does not exist");
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.end(JSON.stringify(data));
    }
  })
}

function handleGetAllRequest(req, res) {
  ModsDB.getAll().then((data) => {
    if (data === null) {
      res.statusCode = 404;
      res.write("Empty");
      res.end();
    } else {
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
  // To read from Body of HTTP
  let arr = [];
  req.on("data",(chunk) => {
    arr.push(chunk);
  })
  req.on("end",()=>{
    // filter is an object to pass to search function
    let filter = JSON.parse(arr)["filter"];
    ModsDB.search(filter).then((data) =>
    {
      if(data.length === 0){
        res.statusCode = 404;
        res.write("Can't find any mod with this filter");
        res.end();
      }
      else{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        // Give all matched mods, and the number of matching
        res.end(JSON.stringify({data, "num":data.length})); 
      }
    })
  });
}
/**
 * This function means to give the right result by filtering by TAGS
 */
function handleFilterTagRequest(req,res){
  let arr = [];
  req.on("data",(chunk) => {
    arr.push(chunk);
  })
  req.on("end",()=>{
    let result = [];
    let tag = JSON.parse(arr)["tag"];
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
        res.statusCode = 404;
        res.write("Can't find any mod with these tag filters");
        res.end();
      }
      else{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({result, "num":result.length})); 
      }
    })
  })
}

/**
 * Notice that this function is unfinished
 * 这个函数还未完成
 */
function handleUpdateRequest(req,res){
  let arr = [];
  req.on("data",(chunk) => {
    arr.push(chunk);
  })
  req.on("end", ()=>
  {
    let targetName = JSON.parse(arr)["targetName"];
    let modChange = JSON.parse(arr)["mod"];
    let changeInfo = new ModsDB.Mod();
    changeInfo.modName = modChange["modName"];
    changeInfo.author = modChange["author"];
    ModsDB.update(targetName,changeInfo).then((data)=>
    {
      if(data){
        res.statusCode = 404;
        res.write("Mod does not exist " + targetName + " or new mod name already exists");
        res.end();
      }
      else{
        res.statusCode = 204;
        res.end("Update successfully!");
      }
    })
  })

}

function handleUpdateTag(req, res){
  let arr = [];
  req.on("data", (chunk) => {
    arr.push(chunk);
  })
  req.on("end", () => {
    let changed_tags = JSON.parse(arr);
    let modName = changed_tags["modName"];
    let added_tag = changed_tags["addedTags"];
    let deleted_tag = changed_tags["deletedTags"];
    ModsDB.find(modName).then((data) => {
      
    })
  })
}

function handleUpdatelike(req, res){

}

function handleUpdateView(req, res){

}


module.exports = { handleUploadReqeust, handleGetModRequest, handleGetAllRequest, handleDeleteModRequest, handleFilterRequest,handleFilterTagRequest,handleUpdateRequest, handleRemoveAllRequest };