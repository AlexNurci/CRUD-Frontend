import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";
import EditCampus from "./EditCampus";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./styles.css";

const SingleCampus = () => {
  const { campusId } = useParams();
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/campuses/${campusId}`
        );
        setCampus(res.data);
      } catch (error) {
        console.error("Error fetching campus:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampus();
  }, [campusId]);

  if (loading) return <p>Loading student data...</p>;
  if (!campus) return <p>Loading campus...</p>;

  return (
    <div className="single-campus">
      <br></br>
      <h2>{campus.campusName}</h2>
      <br></br>
      <p>Location: {campus.address}</p>
      <p>{campus.students} students</p>
      <br></br>
      <p>Abouts us: {campus.description}</p>
      <br></br>
      <br></br>
      <h3>Enrolled Students</h3>
      <ul className="rem-list">
        {(Array.isArray(campus.students)
      ? campus.students                       
      : Object.values(campus.students || {})) 
    .map((student) => (
      <div key={student.id}>
        <NavLink to={`/students/${student.id}`}>
          {student.firstName} {student.lastName}
        </NavLink>
      </div>
    ))}
      </ul>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <Routes>
          <Route path={`/campuses/${campus.id}/edit`} element={<EditCampus />}/>
        </Routes>
        <br></br>
        <NavLink className="editButton" to={`/campuses/${campus.id}/edit`}>Edit Campus</NavLink>
    </div>
  );
};

export default SingleCampus;