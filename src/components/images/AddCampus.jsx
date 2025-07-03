import React, { useState } from "react";
import axios from "axios";


const AddCampus = () => {
  const [campusName, setCampusName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState(""); 
  const [campuses, setCampuses] = useState([]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/campuses", {
        campusName,
        address,
      });

      setCampuses([...campuses, response.data]);
      setCampusName("");
      setAddress("");
      setStudents("");
    } catch (error) {
      console.error("Failed to add campus:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a New Campus</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Campus Name"
          value={campusName}
          onChange={(e) => setCampusName(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br />
         <input
          placeholder="How many students"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3>New Campuses</h3>
      <ul>
        {campuses.map((s) => (
          <li key={s.id}>{s.campusName} {s.address} ({s.students})</li>
        ))}
      </ul>
    </div>
  );
};

export default AddCampus;
