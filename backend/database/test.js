const ModsDB = require('./modsDatabase.js');
const AccountsDB = require('./accountsDatabase.js');

async function testAccounts() {
    await AccountsDB.insert(new AccountsDB.Account('test1', 'test1'));
    account1 = await AccountsDB.find('test1');
    console.log(account1);
    // await AccountsDB.remove('test1');
    await AccountsDB.update('test1', 'test1', 'test1', 'password1');
    account1 = await AccountsDB.find('test1');
    console.log(account1);
}

testAccounts().catch(console.error);
