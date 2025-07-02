import React, { useState } from "react";
import axios from "axios";


// do we add image?

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");
  const [students, setStudents] = useState([]); 
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/students", {
        firstName,
        lastName,
        gpa,
        email,
      });

      setStudents([...students, response.data]);
      setFirstName("");
      setLastName("");
      setGpa("");
      setEmail("");
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
         <input
          placeholder="GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>New Students</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.firstName} {s.lastName} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default AddStudent;
