import React, { useState } from 'react';
import { db, storage } from '../../FireBase';

export const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);

  const types = ["image/jpeg", "image/png", "image/gif"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !image) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on("state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      err => {
        setError(err.message);
        setUploadProgress(null);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          db.collection('Products').add({
            productName: title,
            productPrice: Number(price),
            productImage: url
          }).then(() => {
            setTitle("");
            setPrice("");
            setImage(null);
            setError("");
            setUploadProgress(null);
            document.getElementById("file").value = "";
          }).catch(err => setError(err.message));
        });
      }
    );
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
      <h1>Add Product</h1>
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
          {uploadProgress !== null && <p>Upload Progress: {uploadProgress.toFixed(2)}%</p>}
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
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

export default AddProduct;

















 