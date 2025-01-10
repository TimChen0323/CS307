import React, { useState } from "react";


// note : overall, what this does is everytime a new letter is typed (onChange), it updates the state
// depending on if it was written in the job or name field. When submit is pressed, it updates the 
// table with the state, then resets it back to default, clearing the fields. 
function Form(props) {
    const [person, setPerson] = useState({
        name: "",
        job: ""
    });

    // note : the person[] is to access the state values, equivalent to person.name or person,job
    function handleChange(event) {
        const {name, value} = event.target
        if (name === "job")
            setPerson( {name: person["name"], job: value} );
        else setPerson( {name: value, job: person["job"] });
    }

    function submitForm() {
        props.handleSubmit(person);
        setPerson({ name: "", job: "" });
    }
    
    return (
        <form>
        <label htmlFor="name">Name</label>
        <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
        />
        <label htmlFor="job">Job</label>
        <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
        />
        <input type="button" value="Submit" onClick={submitForm} />
    </form>
    )
}

export default Form