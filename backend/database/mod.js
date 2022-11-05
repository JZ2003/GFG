class Mod {
    // default mod constructor
    static getDefaultMod () {
        return new Mod("Default Mod", "Default Author", "Default Description", "2022/11/01", "2022/11/01", "https://www.google.com", "Default Game", "Default Tag", 0, "Default Icon");
    }

    constructor(mod_name, author, desc, date_created, date_modified, url, game_name, tag, views, icon) {
        this.mod_name = mod_name;
        this.author = author;
        this.desc = desc;
        this.date_created = date_created;
        this.date_modified = date_modified;
        this.url = url;
        this.game_name = game_name;
        this.tag = tag;
        this.views = views;
        this.icon = icon;
    }
}

module.exports = { Mod };