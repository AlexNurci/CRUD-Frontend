import React, { useEffect, useState } from "react";
import axios from "axios";

const AllCampuses = () => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/campuses")
      .then((response) => setCampuses(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (campusId) => {
    try {
      await axios.delete(`http://localhost:8080/api/campuses/${campusId}`);

      setCampuses((prev) => prev.filter((campus) => campus.id !== campusId));
    } catch (error) {
      console.error("Failed to delete campus:", error);
    }
  };

  return (
    <div>
      <h2>All Campuses</h2>
      <ul>
        {campuses.map((campus) => (
          <li key={campus.id}>
            <h3>{campus.campusName}</h3>
            <p>{campus.address}</p>
            <p>{campus.students}</p>
            <p>{campus.description}</p>
            <p></p>
            {campus.imageUrl && (
              <img src={campus.image} alt={`${campus.name} campus`} />
            )}
            <button onClick={() => handleDelete(campus.id)}>
              Delete Campus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCampuses;
