const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'app.db');
const sqlPath = path.join(__dirname, 'model.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
        
        db.run('PRAGMA foreign_keys = ON');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        db.exec(sql, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Database initialized.');
            }
        });
    }
});

module.exports = db;