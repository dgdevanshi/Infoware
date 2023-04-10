const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "infoware",
});

con.connect((err) => {
    if(err) throw err
    console.log("Connected to database");
});

module.exports.con = con;