const db = require('../Utils/db');
module.exports = class Users {
    constructor(id, username, password, name, email, dob, permission) {
        this.ID = id;
        this.Username = username;
        this.Password = password;
        this.Name = name;
        this.Email = email;
        this.DOB = dob;
        this.Permission = permission;
    }
    static async checkExistUsername(username) {
        try {
            let data = await db.selectByID("Users", "Username", username);
            console.log(data)
            if (data) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }
    static async selectByUsername(username) {
        try {
            let data = db.selectByID("Users", "Username", username);
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async insertAccount(user) {
        try {
            let data = await db.insert("Users", user, "ID");
            return data.ID;
        } catch (error) {
            throw error;
        }
    }
    static async selectMaxID() {
        try {
            let data = await db.selectMax("Users", "ID");
            if (data) {
                return data.max;
            }
            return data
        } catch (error) {
            throw error;
        }
    }
}