const ModsDB = require('./database/modsDatabase.js');

function handleUploadReqeust(req, res) {
  const { headers } = req;
  const Mod = headers.mod;
  
  ModsDB.insert(Mod).then((canInsert) => {
    if (canInsert) {
      res.statusCode = 201;
      res.end();
    } else {
      res.statusCode = 409;
      res.write("Alreday existed");
      res.end();
    }
  });
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

function handleChangeModRequest(req, res) {
  const { headers } = req;
  to_be_update = headers.modName;
  update = headers.mod;

  ModsDB.update(to_be_update, update).then((canUpdate) => {
    if (canUpdate) {
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 409;
      res.write("Modname does not exist or new mod name conflict");
      res.end();
    }
  })
}

function handleGetModRequest(req, res) {
  const queryObject = url.searchParams;
  const modName = queryObject.get('modName');

  ModsDB.find(modName).then((data) => {
    if (data == null) {
      res.statusCode = 404;
      res.write("Mod does not exist");
      res.end();
    } else {
      res.statusCode = 200;
      res.write(data);
      res.end();
    }
  })
}

function handleGetAllRequest(req, res) {
  ModsDB.getALl().then((data) => {
    if (data == null) {
      res.statusCode = 404;
      res.write("Empty");
      res.end();
    } else {
      res.statusCode = 200;
      res.write(data);
      res.end();
    }
  })
}

module.exports = { handleUploadReqeust, handleChangeModRequest, handleGetModRequest, handleGetAllRequest, handleDeleteModRequest };