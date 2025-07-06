import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//Component not working, needs fixing

const EditCampus = () => {
  const { campusId } = useParams();

  const [campusName, setCampusName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/campuses/${campusId}`);
        const campus = res.data;
        setCampusName(campus.campusName);
        setAddress(campus.address);
        setStudents(campus.students);
        setImage(campus.image);
        setDescription(campus.description);
      } catch (error) {
        console.error("Error fetching campus:", error);
      }
    };
    fetchCampus();
  }, [campusId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/campuses/${campusId}`, {
        campusName,
        address,
        students,
        image,
        description,
      });
      alert("Campus updated successfully!");
    } catch (error) {
      console.error("Failed to update campus:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Campus</h2>
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
          type="number"
          placeholder="How many students"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
          required
        />
        <br />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCampus;