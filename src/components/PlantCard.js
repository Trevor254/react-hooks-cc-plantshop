import React, { useState } from "react";

const PlantCard = ({ plant, plants, setPlants }) => {
  const [price, setPrice] = useState(plant.price);

  const handleSoldOut = () => {
    setPlants(
      plants.map((p) =>
        p.id === plant.id ? { ...p, soldOut: !p.soldOut } : p
      )
    );
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setPrice(newPrice);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    }).then(() => {
      setPlants(
        plants.map((p) =>
          p.id === plant.id ? { ...p, price: newPrice } : p
        )
      );
    });
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => setPlants(plants.filter((p) => p.id !== plant.id)));
  };

  return (
    <li data-testid="plant-item">
      <h4>{plant.name}</h4>
      <img
        src={plant.image || "https://via.placeholder.com/400"}
        alt={plant.name}
        style={{ width: "200px", height: "auto" }}
      />
      <p>Price: ${parseFloat(price).toFixed(2)}</p>
      <input type="number" value={price} onChange={handlePriceChange} />
      <button onClick={handleSoldOut}>
        {plant.soldOut ? "In Stock" : "Sold Out"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
  
};

export default PlantCard;