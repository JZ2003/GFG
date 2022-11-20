const ModsDB = require('./modsDatabase.js');
const AccountsDB = require('./accountsDatabase.js');

async function printAllAccounts() {
    let accounts = await AccountsDB.getAll();
    console.log(accounts);
}
async function printAllMods() {
    mods = await ModsDB.getAll();
    console.log(mods);
}
async function main() {
    await printAllAccounts();
    await printAllMods();
}

main().catch(console.error);
