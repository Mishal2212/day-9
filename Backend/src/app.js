const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path=require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

/**
 * -POST - /api/notes - Create a new note and save it in mongodb
 * -req.body- {title,description}
 */

app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body
    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note created successfully",
        note
    })
})


/**
 * -GET - /api/notes
 * -fetch all the notes from mongodb and send them in the response
 */

app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find()
    
    res.status(200).json({
        message:"Notes fetched successfully",
        notes
    })
})

/**
 * DELETE - /api/notes/:id
 * -delete a note from mongodb based on the id provided in the req.params
 */

app.delete("/api/notes/:id",async(req,res)=>{
    const id= req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully."
    })
})

/**
 * PATCH - /api/notes/:id
 * -update the description of a note by id
 * req.body - {description}
 */
app.patch("/api/notes/:id",async(req,res)=>{
    const id =req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id,{ description })

    res.status(200).json({
        message:"Note updated successfully."
    })
})


app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})


module.exports = app