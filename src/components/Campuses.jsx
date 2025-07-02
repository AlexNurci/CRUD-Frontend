import React, { useEffect, useState } from "react";
import axios from "axios";


const AllCampuses = () => {
  const [campuses, setCampuses] = useState([
     {
    id: 1,
    name: "Hardcoded Campus 1",
    
  },
  {
    id: 2,
    name: "Hardcoded Campus 2",
  
  }
  ]);

  useEffect(() => {
    axios
      .get("/api/campuses")
      .then((response) => setCampuses(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (campusId) => {
    try {
      await axios.delete(`/api/campuses/${campusId}`);
    
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
            <h3>{campus.name}</h3>
            {campus.imageUrl && (
                <img>
                src={campus.imageUrl}
                alt={'${campus.name} campus'    }
                </img>
            )}
            <button onClick={() => handleDelete(campus.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCampuses;
