import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import axios from "axios";
import EditCampus from "./EditCampus";
import { BrowserRouter as Router, Routes, Route } from "react-router";

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
    <div>
      <h2>{campus.campusName}</h2>
      <p>{campus.address}</p>
      <p>{campus.students}</p>
      <p>{campus.description}</p>

      <h3>Enrolled Students</h3>
      <ul>
        {(Array.isArray(campus.students)
      ? campus.students                       
      : Object.values(campus.students || {})) 
    .map((student) => (
      <li key={student.id}>
        <NavLink to={`/students/${student.id}`}>
          {student.firstName} {student.lastName}
        </NavLink>
      </li>
    ))}
      </ul>
        <Routes>
          <Route path="/edit-campus/:campusId" element={<EditCampus />}/>
        </Routes>
      <NavLink to="/edit-campus/:campusId">Edit Campus</NavLink>
    </div>
  );
};

export default SingleCampus;