// ItemDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/items/${id}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="item-details">
      {item ? (
        <>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          {/* Add any other item details you want to display */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetails;
