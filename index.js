const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mysql = require('mysql')

app.set("view engine", "ejs")
app.use(express.static(__dirname)) //cai ney de minh add them file css
app.use(bodyParser.urlencoded({ extended: true })) //de doc du lieu them vao tu man hinh

let con = mysql.createConnection({
    database: "todo_app",
    host: "localhost",
    user: "root",
    password: "123456"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected Sql!");
});

app.listen(3000, function() {
    console.log("Access port 3000!")
})

app.get("/", function(req, res) {
    console.log("Home page")
    con.query("SELECT * FROM todo_app.My_Table", function(err, results) {
        if (err) throw err;
        res.render("index.ejs", { results })
    });
})

app.post("/add", function(req, res) {
    console.log("Received add post", req.body)
    con.query(`INSERT INTO todo_app.My_Table (classEmblem, img, class, name) VALUES('${req.body.link}', '${req.body.img}', '${req.body.title}', '${req.body.price}')`, function(err, results) {
        if (err) throw err;

    });
})

app.post("/fix", function(req, res) {
    console.log("Received fix post", req.body)
    con.query(`UPDATE todo_app.My_Table SET name = '${req.body.newName}' WHERE name = '${req.body.name}'`, function(err, results) {
        if (err) throw err;

    });
})

app.post("/del", function(req, res) {
    console.log("Received del post", req.body)
    con.query(`DELETE FROM todo_app.My_Table WHERE name = '${req.body.name}'`, function(err, results) {
        if (err) throw err;

    });
})