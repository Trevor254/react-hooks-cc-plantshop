import React, { useState } from "react";

const NewPlantForm = ({ plants, setPlants }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // lowercase is correct
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newPlant) => setPlants([...plants, newPlant]));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Plant name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        type="text"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default NewPlantForm;