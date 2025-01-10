import React, {useState} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  // note : the spread operator basically takes the existing characters array
  // then creates a new array that has person appended to the end of the existing.
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  // characterData is arbitrary name, braces are because "characters" is a js expr within html
  return (
    <div className="container">
      <Table
      characterData={characters} 
      removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;