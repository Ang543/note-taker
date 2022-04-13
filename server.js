const express=require("express")
const path=require("path")
const fs = require("fs")
const app=express()
let notes=require("./db/db.json")
const { v4: uuidv4 } = require('uuid');

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

const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
}

    notes.push(newNote);

    console.log(notes)

    fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
        res.json(req.body)
    })

   
})

app.delete("/api/notes/:id", (req, res) => {
const updatedNote = notes.filter((note) => {
    return (note.id != req.params.id)
})
notes = updatedNote
fs.writeFile("./db/db.json", JSON.stringify(updatedNote), () => {
    res.json(req.body)
})
})

app.listen(3001, () => {
    console.log ("server is running")
})