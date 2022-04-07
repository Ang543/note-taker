const express=require("express")
const path=require("path")
const fs = require("fs")
const app=express()
const notes=require("./db/db.json")

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req, res)=>{
res.sendFile(path.join(__dirname, "./public/index.html"))
}) 

app.get("/notes",(req, res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
    }) 

    app.get("/api/notes",(req, res)=>{
      res.json(notes)
        }) 

app.post("/api/notes", (req, res) => {
    console.log(notes);

    notes.push(req.body);

    console.log(notes)

    fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
        res.json(req.body)
    })

   
})

app.listen(3001, ()=>{
    console.log ("server is running")
})