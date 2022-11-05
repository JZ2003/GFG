const ModsDB = require('./modsDatabase.js');
const AccountsDB = require('./accountsDatabase.js');

async function testAccounts() {
    await AccountsDB.insert(new AccountsDB.Account('T1', 'pwd1'));
    account1 = await AccountsDB.find('T1');
    console.log(account1);
    // await AccountsDB.remove('test1');
    await AccountsDB.update('T2', 'pwd2', 'pwd3');
    account1 = await AccountsDB.find('T1');
    console.log(account1);
    await AccountsDB.removeAll();
}

async function testMods() {
    testMod1 = new ModsDB.Mod('Test Mod', 'Test Author', 'Test Description', '2022/11/01', '2022/11/01', 'https://www.google.com', 'Test Game', 'Test Tag', 0, 'Test Icon');
    testMod2 = new ModsDB.Mod('Test Mod 2', 'Test Author 2', 'Test Description 2', '2022/11/01', '2022/11/01', 'https://www.google.com', 'Test Game 2', 'Test Tag 2', 0, 'Test Icon 2');
    testMod3 = new ModsDB.Mod('Test Mod 3', 'Test Author 3', 'Test Description 3', '2022/11/01', '2022/11/01', 'https://www.google.com', 'Test Game 3', 'Test Tag 3', 0, 'Test Icon 3');
    // await ModsDB.insertDefault();
    // mod1 = await ModsDB.find('Default Mod');
    // console.log(mod1);
    // await ModsDB.remove('Default Mod');

    // await ModsDB.insert(testMod1);
    // modTest = await ModsDB.find('Test Mod');
    // console.log(modTest);
    // await ModsDB.update(testMod1.modName, testMod2);
    // modTest = await ModsDB.find('Test Mod 2');
    // console.log(modTest);
    
    await ModsDB.insert(testMod1);
    await ModsDB.update(testMod1.modName, testMod3);
    // mods = await ModsDB.search({});
    // console.log(mods);
    await ModsDB.removeAll();
}


testMods().catch(console.error);
