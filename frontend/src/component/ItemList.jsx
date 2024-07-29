import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ItemList.css";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="item-list">
      <div>
        <h2>Item List</h2>
      </div>
      <div className="item-cards">
        {items.map((item) => (
          <div className="item-card" key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <Link to={`/item/${item._id}`} className="view-details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
