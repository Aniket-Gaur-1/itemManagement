import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserPage.css";

function UserPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://itemmanagement-back.onrender.com"
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="user-page">
      <h2>User Page</h2>
      <div className="item-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <Link to={`/item/${item._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;
