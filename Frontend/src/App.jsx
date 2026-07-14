import { useState,useEffect } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState( []);

  console.log("Hello integration")

  function fetchNotes(){
    axios.get("https://day-9-bnls.onrender.com/api/notes")
     .then(res=>{
       setNotes(res.data.notes)
        })
  }


  useEffect( () => {
    fetchNotes();
  } , [])


  function handleSubmit(e){
    e.preventDefault();

    const{title,description} = e.target.elements

    console.log(title.value,description.value)

    axios.post("https://day-9-bnls.onrender.com/api/notes",{
    title:title.value,
    description:description.value
  })
  .then(res=>{
    console.log(res.data)


    fetchNotes()
  })
  }

  function handleDeleteNote(noteId){
    axios.delete(`https://day-9-bnls.onrender.com/api/notes/${noteId}`)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleUpdateNote(note){
    const newDescription = prompt("Enter new description",note.description);

    if(newDescription === null) return;
    axios.patch(`https://day-9-bnls.onrender.com/api/notes/${note._id}`,{
      description:newDescription
    })
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  return (
    <>

    <form className="note-create-form" onSubmit={handleSubmit}>
      <input type="text" name='title' placeholder="Enter Title"  />
      <input type="text" name='description' placeholder="Enter Description"  />
      <button>Create note</button>
    </form>

    <div className="notes">
      {notes.map((note,key)=>{
          return <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
              <button onClick={()=>{handleUpdateNote(note)}}>Update note</button>
      </div>
      })} 
    </div>
        </>
  )
}

export default App
