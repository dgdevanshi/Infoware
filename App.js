const express = require("express");
const { con } = require("./connection");
const app = express();
const PORT = 3090;
const mysql = require("./connection").con;

app.use(express.urlencoded());
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", "./view");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.get("/update", (req, res) => {
    res.render("update");
});

app.get("/delete", (req, res) => {
    res.render("delete");
});

app.get("/get", (req, res) => {
    res.render("get");
});

app.get("/createemp", (req, res) => {
    const { name, phone, email } = req.query
    let qry = "select * from employee where email=?";
    mysql.query(qry, [email], (err, results) => {
        if (err)
            throw err
        else {
            if (results.length > 0) {
                res.render("create", { checkmesg: true })
            } else {
                let qry2 = "insert into employee values(?,?,?)";
                mysql.query(qry2, [name, phone, email], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("create", { mesg: true })
                    }
                })
            }
        }
    })
});

app.get("/getemp", (req, res) => {
    const {email} = req.query;
    let qry = "select * from employee where email=?";
    mysql.query(qry, [email], (err, results) => {
        console.log(results)
        if(err) throw err
        else {
            if (results.length>0) {
                res.render("get", {mesg1: true, mesg2: false, 
                    name: results[0].name, phone: results[0].phone, email: results[0].email})
            }
            else {
                res.render("get", {mesg1: false, mesg2: true})
            }
        }
    })
});

app.get("/updatesearch", (req, res) => {
    const {email} = req.query;
    let qry = "select * from employee where email=?";
    mysql.query(qry, [email], (err, results) => {
        console.log(results)
        if(err) throw err
        else {
            if (results.length>0) {
                res.render("update", {mesg1: true, mesg2: false, data:results})
            }
            else {
                res.render("update", {mesg1: false, mesg2: true})
            }
        }
    })
});

app.get("/updateemp", (req, res) => {
    const {name, phone, email} = req.query;
    let qry = "update employee set name=?, phone=? where email=?";
    mysql.query(qry, [name, phone, email], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })
});

app.get("/deleteemp", (req, res) => {
    const { email } = req.query;
    let qry = "delete from employee where email=?";
    mysql.query(qry, [email], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {
                res.render("delete", { mesg1: false, mesg2: true })
            }
        }
    });
});

app.get("/listemp", (req, res) => {
    let qry = "select * from employee";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("list", { data: results });
        }
    });
});


app.listen(PORT, (err) => {
    if (err) 
        throw err
    else 
        console.log(`Server is running on port ${PORT}`);
});