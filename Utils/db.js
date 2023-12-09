const { TableName } = require('pg-promise');

require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true
});
const cn = {
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    max: 30 // use up to 30 connections
};
const db = pgp(cn)
module.exports =
{
    selectAll: async (tbName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            //let data = [];
            data = await dbcn.any(`SELECT * FROM "${tbName}"`);
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },
    selectByID: async (tbName, fieldname, value) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            data = await dbcn.oneOrNone(`SELECT * FROM "${tbName}" where "${fieldname}" = $1`, [value]);
            //  console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },
    selectByOneField:
        async (tbName, fieldname, value) => {
            let dbcn = null;
            try {
                dbcn = await db.connect();
                data = await dbcn.any(`SELECT * FROM "${tbName}" where "${fieldname}" = $1`, [value]);
                //  console.log(data)
                return data;
            } catch (error) {
                throw error;
            }
            finally {
                dbcn.done();
            }
        }
    ,
    insert: async (tbName, entity, fieldname) => {
        try {
            const query = pgp.helpers.insert(entity, null, tbName);
            console.log(query)
            const data = await db.one(query + ` returning "${fieldname}"`);
            return data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (tbName, fieldname, value) => {
        try {
            await db.none(`delete from "${tbName}" where "${fieldname}" = $1`, [value])
        } catch (error) {
            throw error;
        }
    },
    update: async (tbName, entity, fieldName, value) => {
        try {
            const query = pgp.helpers.update(entity, null, tbName) + ` where "${fieldName}" = $1`;
            await db.none(query, [value]);
        } catch (error) {
            throw error;
        }
    },
    selectMax: async (tbName, fieldName) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            data = await dbcn.oneOrNone(`SELECT max("${fieldName}") FROM "${tbName}" `);
            console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    }
}