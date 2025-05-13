import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const NgSubmission = ({ addNgData }) => {
  const [formData, setFormData] = useState({
    line: '',
    process: '',
    defect: '',
    model: '',
    qty: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pastikan data form valid
    if (!formData.line || !formData.process || !formData.defect || !formData.model || !formData.qty || !formData.photo) {
      alert("Please fill out all fields and upload a photo.");
      return;
    }

    // Menambahkan ID unik untuk setiap data yang baru dibuat
    const newData = {
      id: Date.now(), // Menggunakan timestamp sebagai ID unik
      line: formData.line,
      process: formData.process,
      defect: formData.defect,
      model: formData.model,
      qty: formData.qty,
      time: new Date().toLocaleString(),
      photo: URL.createObjectURL(formData.photo), // Menggunakan URL.createObjectURL untuk menampilkan foto
    };

    // Mengirim data ke App.js
    addNgData(newData);

    // Reset form setelah submit
    setFormData({
      line: '',
      process: '',
      defect: '',
      model: '',
      qty: '',
      photo: null,
    });
  };

  return (
    <div className="ng-submission-container">
      <div className="top-navigation">
        <Link to="/show-ng">
          <button className="top-button">SHOW NG</button>
        </Link>
        <Link to="/list-ng">
          <button className="top-button">NG LIST</button>
        </Link>
        <Link to="/">
          <button className="home-button">HOME</button>
        </Link>
        <Link to="/monitor-NG">
          <button className="top-button">MONITOR</button>
        </Link>
        <Link to="/grafik-ng">
          <button className="top-button">GRAPH</button>
        </Link>
      </div>

      <header className="header">
        <h1>Form NG Product Monitoring</h1>
        <h3>PT LG ELECTRONICS INDONESIA</h3>
        <p>Jl. Jawa, Gandamekar, Kec. Cikarang Bar, Kabupaten Bekasi, Jawa Barat 17530</p>
      </header>

      <form onSubmit={handleSubmit} className="ng-form">
        <div className="input-row">
          <div className="input-group">
            <label>LINE</label>
            <select
              name="line"
              value={formData.line}
              onChange={handleChange}
              required
            >
              <option value="">Select Line</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T5">T5</option>
              <option value="T6">T6</option>
              <option value="M1">M1</option>
              <option value="C1">C1</option>
            </select>
          </div>
          <div className="input-group">
            <label>PROCESS</label>
            <input
              type="text"
              name="process"
              value={formData.process}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>DEFECT</label>
            <input
              type="text"
              name="defect"
              value={formData.defect}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>MODEL</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>QUANTITY</label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>UPLOAD FOTO</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              required
            />
            {formData.photo && (
              <div className="preview-container">
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className="photo-preview"
                />
              </div>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NgSubmission;
