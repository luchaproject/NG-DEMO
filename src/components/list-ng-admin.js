import React, { useState } from 'react';
import { exportToExcel } from '../utils';
import '../style.css';
import { Link } from 'react-router-dom';
import { useNgStatus } from '../contexts/NgStatusContext'; // Import hook untuk mengambil status NG

const ListNgAdmin = ({ ngData }) => {
  const [filterLine, setFilterLine] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { ngStatus, toggleStatus } = useNgStatus(); // Mengakses ngStatus dan toggleStatus dari context

  const handlePhotoClick = (photo) => {
    if (selectedPhoto === photo) {
      setSelectedPhoto(null);
    } else {
      setSelectedPhoto(photo);
    }
  };

  const filteredData = ngData
    .filter((ng) => {
      if (filterLine && ng.line !== filterLine) return false;
      if (filterDate && new Date(ng.time).toLocaleDateString() !== new Date(filterDate).toLocaleDateString()) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      if (sortOrder === 'ascending') return dateA - dateB;
      return dateB - dateA;
    });

  const handleExport = () => {
    exportToExcel(filteredData);
  };

  return (
    <div className="list-ng-container">
      <div className="top-navigation-list">
        <Link to="/show-ng">
          <button className="top-button">SHOW NG</button>
        </Link>
        <Link to="/list-ng">
          <button className="list-button-list">NG LIST</button>
        </Link>
        <Link to="/">
          <button className="top-button">HOME</button>
        </Link>
        <Link to="/monitor-NG">
          <button className="top-button">MONITOR</button>
        </Link>
        <Link to="/grafik-ng">
          <button className="top-button">GRAPH</button>
        </Link>
      </div>

      <header className="header">
        <h1>LIST TABEL NG</h1>
      </header>

      <div className="filter-container-list">
        <div className="filter-group">
          <label htmlFor="filterLine">Filter by Line:</label>
          <select
            id="filterLine"
            value={filterLine}
            onChange={(e) => setFilterLine(e.target.value)}
          >
            <option value="">All Lines</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
            <option value="T5">T5</option>
            <option value="T6">T6</option>
            <option value="M1">M1</option>
            <option value="C1">C1</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filterDate">Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sortOrder">Sort by Time:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>

      <div className="export-container">
        <button onClick={handleExport}>Export to Excel</button>
      </div>

      <table className="ng-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Line</th>
            <th>Process</th>
            <th>Defect</th>
            <th>Model</th>
            <th>Qty</th>
            <th>Time</th>
            <th>Status</th>
            <th>Photo</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((ng, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ng.line}</td>
              <td>{ng.process}</td>
              <td>{ng.defect}</td>
              <td>{ng.model}</td>
              <td>{ng.qty}</td>
              <td>{ng.time}</td>
              <td>
                {/* Menampilkan status berdasarkan data dari NgStatusContext */}
                {ngStatus[ng.id] === 'checked' ? 'Checked' : 'Unchecked'}
              </td>
              <td>
                <img
                  src={ng.photo}
                  alt="NG"
                  className="ng-photo-table"
                  onClick={() => handlePhotoClick(ng.photo)}
                />
              </td>
              <td>
              <div className="card-actions">
              <button
                className="check-button-list"
                onClick={() => toggleStatus(ng.id)} // Gunakan toggleStatus untuk mengubah status
              >
                {ngStatus[ng.id] === 'checked' ? 'Check' : 'Uncheck'}
              </button>
            </div>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Foto Preview */}
      {selectedPhoto && (
        <div className="photo-preview-container show" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-preview-content">
            <img src={selectedPhoto} alt="Preview" className="photo-preview-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListNgAdmin;
