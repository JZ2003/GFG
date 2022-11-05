const ModsDB = require('./modsDatabase.js');

async function testMain() {
    ModsDB.insertDefaultMod();
    ModsDB.getMod("Default Mod");
}

testMain().catch(console.error);
