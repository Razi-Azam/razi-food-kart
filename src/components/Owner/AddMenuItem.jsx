import React, { useState } from "react";

const AddMenuItem = ({ restaurantId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) return alert("Please upload an image");

    // Generate file name
    const fileName = Date.now() + "-" + imageFile.name;
    const imagePath = "/uploads/" + fileName;

    // Save file into public/uploads
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;

      fetch("http://localhost:5000/save-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, base64 }),
      });
    };
    reader.readAsDataURL(imageFile);

    // Save item in db.json
    await fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        name,
        price: Number(price),
        image: imagePath,
        rating: 0,
        ratingsCount: 0,
        outOfStock: false
      })
    });

    alert("Menu Item Added!");
    setName("");
    setPrice("");
    setImageFile(null);
    setPreview(null);
  };

  return (
    <div className="card p-4">
      <h4>Add Menu Item</h4>

      <form onSubmit={handleSubmit}>
        <label>Food Name</label>
        <input className="form-control"
          value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Price</label>
        <input className="form-control"
          value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Image</label>
        <input type="file" className="form-control" accept="image/*"
          onChange={handleImageChange} />

        {preview &&
          <img src={preview} alt="preview" height="120" className="mt-3" />
        }

        <button className="btn btn-success mt-3">Add Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
