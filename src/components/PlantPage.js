import React, { useState, useEffect } from "react";
import Search from "./Search";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";

const PlantPage = () => {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((plantsData) => setPlants(plantsData));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm)
  );

  return (
    <main>
      <Search handleSearch={handleSearch} />
      <NewPlantForm plants={plants} setPlants={setPlants} />
      <PlantList plants={filteredPlants} setPlants={setPlants} />
    </main>
  );
};

export default PlantPage;