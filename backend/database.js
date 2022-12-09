const sqlite = require('sqlite3').verbose();
const fs = require('fs')

const db = new sqlite.Database(__dirname + '/../data/snapshot.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
    if (err !== null) {
        console.log("unable to open database", err);
        return;
    }
});

db.get("PRAGMA foreign_keys = ON;");

var schema = fs.readFileSync(__dirname + "/schema.sql").toString();
db.exec(schema);

function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err != null) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

function exec(sql, params) {
    return new Promise((resolve, reject) => {
        try {
            db.run(sql, params, function (err) {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    query,
    exec
};