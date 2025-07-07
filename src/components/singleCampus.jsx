import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
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
      <h2 className="h2campus">{campus.campusName}</h2>

      <div className="box">
        <div className="content-box"> 
           <p>Location: {campus.address}</p>
        <p>{campus.students} students</p>
        
        <div className="description-box">
           <p>Abouts us: {campus.description}</p>
        </div>
       
        </div>

      <div className="image-box">
        {campus.image && (
          <img src={campus.image} alt={`${campus.campusName} campus`} />
        )}
      </div>
      </div>

      <h3 className="h2css">Enrolled Students</h3>
      <ul className="rem-list">
        {(Array.isArray(campus.students)
          ? campus.students
          : Object.values(campus.students || {})
        ).map((student) => (
          <div key={student.id}>
            <NavLink to={`/students/${student.id}`}>
              {student.firstName} {student.lastName}
            </NavLink>
          </div>
        ))}
      </ul>

      <NavLink className="editButton" to={`/campuses/${campus.id}/edit`}>
        Edit Campus
      </NavLink>
    </div>
  );
};

export default SingleCampus;
