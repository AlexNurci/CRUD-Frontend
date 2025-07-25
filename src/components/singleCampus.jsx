import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import EditCampus from "./EditCampus";
import { Routes, Route } from "react-router";
import "./styles.css";

const SingleCampus = () => {
  const { campusId } = useParams();
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(
          `https://crud-backend-weld-seven.vercel.app/api/campuses/${campusId}`
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
    <h2 className="h2campus">{campus.campusName}</h2>

    <div className="box">
      <div className="content-box"> 
        <p>Location: {campus.address}</p>
        <p>{campus.students?.length || 0} students</p>

        <div className="description-box">
          <p>About us: {campus.description}</p>
        </div>
      </div>

      <div className="image-box">
        {campus.image && (
          <img src={campus.image} alt={`${campus.campusName} campus`} />
        )}
      </div>
    </div>

    <h3 className="h2css">Enrolled Students</h3>
    {campus.students?.length ? (
      <ul className="rem-list">
        {campus.students.map((s) => (
          <li key={s.id}>
            <NavLink to={`/students/${s.id}`}>
              {s.firstName} {s.lastName}
            </NavLink>
          </li>
        ))}
      </ul>
    ) : (
      <p>No students enrolled.</p>
    )}

    <div className="button-group">
    <NavLink className="editButton" to={`/campuses/${campus.id}/edit`}>
      Edit Campus
    </NavLink>
    </div>
  </div>
);
}

export default SingleCampus;