import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [isReload ,setReload] = useState (false)

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [isReload]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header

  */
  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.searchText.value;

    fetch(`http://localhost:5000/notes/${searchValue}`)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };

  /*2. here there will be a function named handleDelete
to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
 */

  const handelDelete = id =>{
    
    console.log(id);
    fetch(`http://localhost:5000/note/${id}`,{
    method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
      setReload(!isReload)
  }

  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */

   

  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */

  const haderPost = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const address = event.target.address.value;
    const datas = {
      name: name,
      address: address,
    };
    console.log(datas);
    fetch("http://localhost:5000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    })
      .then((res) => res.json())
      .then((data) => setNotes(data));
      setReload(!isReload)
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm haderPost={haderPost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard note={note}  handelDelete={handelDelete} setReload ={setReload}  isReload ={isReload}/>
        ))}
      </div>
    </div>
  );
}

export default App;
