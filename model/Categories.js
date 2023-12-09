const db = require('../Utils/db');
module.exports = class Categories {
    constructor(CatID, CatName) {
        this.CatID = CatID;
        this.CatName = CatName;
    }
    static async selectAllCate() {
        try {
            let data = db.selectAll("Categories");
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async selectMaxID() {
        try {
            let data = await db.selectMax("Categories", "CatID");
            if (data) {
                return data.max;
            }
            return data
        } catch (error) {
            throw error;
        }
    }
    static async insertCate(content) {
        try {


            var c = '';
            let idCate = await this.selectMaxID();
            if (!idCate) {
                c = new Categories(1, content.catName)
            }
            else {
                c = new Categories(idCate + 1, content.catName)
            }

            let id = await db.insert("Categories", c, "CatID");
            return id;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCate(id) {
        try {
            await db.delete("Categories", "CatID", id);
        } catch (error) {
            throw error;
        }
    }
    static async updateCate(content) {
        try {
            await db.update("Categories", new Categories(content.catID, content.catName), "CatID", content.catID);
        } catch (error) {
            throw error;
        }
    }


}