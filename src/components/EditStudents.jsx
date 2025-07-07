import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditStudent = () => {
  const { studentId } = useParams(); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");

  
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/students/${studentId}`);
        const student = res.data;
        setFirstName(student.firstName);
        setLastName(student.lastName);
        setEmail(student.email);
        setGpa(student.gpa);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/students/${studentId}`, {
        firstName,
        lastName,
        email,
        gpa,
      });

      alert("Student updated successfully!");
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Student</h2>
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
          type="email"
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
