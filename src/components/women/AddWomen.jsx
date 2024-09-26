import React, { useState } from 'react';
import { db, storage } from '../../FireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export const AddWomen = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);

  const types = ["image/jpeg", "image/png", "image/gif"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    const imageRef = ref(storage, `images/${image.name}`);

    try {
      const uploadTask = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(uploadTask.ref);

      await addDoc(collection(db, 'Women-Products'), {
        productName: title,
        productPrice: Number(price),
        productImage: url,
      });

         alert("Product added successfully!");

      setTitle("");
      setPrice("");
      setImage(null);
      setError("");
      setUploadProgress(null);
      document.getElementById("file").value = "";
    } catch (err) {
      setError(err.message);
    }
  };

  const imgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setError("");
    } else {
      setImage(null);
      setError("Please select a valid image file (JPEG, PNG, GIF).");
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Add Women's Product</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="file"
            onChange={imgHandler}
            style={{ width: '100%' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: 'gray',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddWomen;
