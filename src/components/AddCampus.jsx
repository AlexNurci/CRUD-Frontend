import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./styles.css";


const AddCampus = () => {
  const [campusName, setCampusName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState(""); 
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://crud-backend-weld-seven.vercel.app/api/campuses", {
        campusName,
        address,
        image,
        description,
      });

      setCampuses([...campuses, response.data]);
      setCampusName("");
      setAddress("");
      setDescription("");
      setImage("");
      navigate("/campuses");
    } catch (error) {
      console.error("Failed to add campus:", error);
    }
  };

  return (
    <>
    <h2>Add a New Campus</h2>
    <div>
      <br></br>
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
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <br />
         <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <br></br>
        <button className="add" type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default AddCampus;
