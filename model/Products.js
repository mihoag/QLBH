const db = require('../Utils/db');
module.exports = class Products {
    constructor(proID, ProName, TinyDes, FullDes, price, catID, quantity) {
        this.ProID = proID;
        this.ProName = ProName;
        this.TinyDes = TinyDes;
        this.FullDes = FullDes;
        this.Price = price;
        this.CatID = catID;
        this.Quantity = quantity;
    }
    static async selectAll() {
        try {
            let data = await db.selectAll("Products");
            return data;
        } catch (error) {
            throw error;
        }
    }
    static async selectByCat(CatID) {
        try {
            let data = await db.selectByOneField("Products", "CatID", CatID);
            return data;
        } catch (error) {
            throw error;
        }
    }
}