import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");
  const [CampusId, setCampus] = useState("");
  const [students, setStudents] = useState([]); 
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/campuses")
      .then((response) => setCampuses(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/students", {
        firstName,
        lastName,
        gpa,
        email,
        CampusId,
      });

      setStudents([...students, response.data]);
      setFirstName("");
      setLastName("");
      setGpa("");
      setEmail("");
      setCampus("");
      navigate("/students");
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a New Student</h2>
      <br></br>
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
        <select>
          <option value>Select Campus</option>
          {campuses.map((campus) => (
            <option key={campus.id}>
              {campus.campusName}
            </option>
          ))}
        </select>
        <br />
        <br></br>
        <button className="add" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudent;
