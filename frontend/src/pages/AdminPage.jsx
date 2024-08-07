import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

function AdminPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(
          "https://itemmanagement-back.onrender.com"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://itemmanagement-back.onrender.com",
        newItem
      );
      setItems([...items, response.data]);
      setNewItem({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://itemmanagement-back.onrender.com/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    try {
      await axios.put(
        `https://itemmanagement-back.onrender.com/${editingItem._id}`,
        editingItem
      );
      setItems(
        items.map((item) => (item._id === editingItem._id ? editingItem : item))
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="create-item">
        <h3>Create New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <button onClick={handleCreate}>Create Item</button>
      </div>
      {editingItem && (
        <div className="update-item">
          <h3>Update Item</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingItem.name}
            onChange={(e) =>
              setEditingItem({ ...editingItem, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={editingItem.description}
            onChange={(e) =>
              setEditingItem({ ...editingItem, description: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update Item</button>
          <button onClick={() => setEditingItem(null)}>Cancel</button>
        </div>
      )}
      <div className="item-list">
        <h3>Items</h3>
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
