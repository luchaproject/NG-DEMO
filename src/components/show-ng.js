// src/components/show-ng.jsx
import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';
import { useNgStatus } from '../contexts/NgStatusContext'; // Pastikan diimpor

const ShowNg = ({ ngData, filterLine, setFilterLine }) => {
  const { ngStatus, toggleStatus } = useNgStatus(); // Mengakses ngStatus dan toggleStatus dari context
  const [alarmSettings, setAlarmSettings] = useState({
    T1: false,
    T2: false,
    T3: false,
    T5: false,
    T6: false,
    M1: false,
    OBM1: false,
  });

  const handleAlarmToggle = (line) => {
    setAlarmSettings((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  const handleAlarmFilterChange = (e) => {
    const selectedLine = e.target.value;
    setAlarmSettings((prev) => ({
      ...prev,
      [selectedLine]: !prev[selectedLine], // Toggle alarm untuk line yang dipilih
    }));
  };

  // Filter ngData berdasarkan filterLine
  const filteredData = filterLine
    ? ngData.filter((ng) => ng.line === filterLine)
    : ngData;

  // Urutkan data berdasarkan waktu (descending)
  const sortedData = filteredData.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div className="show-ng-container">
      <div className="top-navigation-show">
        <Link to="/show-ng">
          <button className="show-button-show">SHOW NG</button>
        </Link>
        <Link to="/list-ng">
          <button className="top-button-show">NG LIST</button>
        </Link>
        <Link to="/">
          <button className="top-button-show">HOME</button>
        </Link>
        <Link to="/monitor-NG">
          <button className="top-button">MONITOR</button>
        </Link>
        <Link to="/grafik-ng">
          <button className="top-button">GRAPH</button>
        </Link>
      </div>

      <div className="admin-show">
        <Link to="/login-show">
          <button >ADMIN</button> {/* Tombol Admin Ver */}
        </Link>
      </div>

      <header className="header">
        <h1>SHOW NG</h1>
      </header>



      {/* Filter Line */}
      <div className='filter-container-show'>
      <div className="filter-group">
        <label htmlFor="filterLine">Filter by Line:</label>
        <select
          id="filterLine"
          value={filterLine}
          onChange={(e) => setFilterLine(e.target.value)} // Menambahkan fungsi untuk mengubah filterLine
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

        {/* Filter untuk memilih line mana yang ingin menerima alarm */}
        <div>
          <div className="filter-group">
            <label htmlFor="filterAlarm">Select Line for Alarm:</label>
            <select
              id="filterAlarm"
              onChange={handleAlarmFilterChange}
              defaultValue=""
            >
              <option value="">Select Line</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T5">T5</option>
              <option value="T6">T6</option>
              <option value="M1">M1</option>
              <option value="OBM1">OBM 1</option>
            </select>
          </div>
        </div>
        </div>
        

      <div className="ng-list">
        {sortedData.slice(0, 3).map((ng, index) => (
          <div
            key={index}
            className={`ng-card ${ngStatus[ng.id] === 'checked' ? 'checked' : 'unchecked'}`}
          >
            <h4>{ng.time}</h4>
            <div className="show-row">
              <div className="show-group">
                <p>LINE: </p>
                <p className="ng-text">{ng.line}</p>
              </div>
              <div className="show-group">
                <p>PROCESS: </p>
                <p className="ng-text">{ng.process}</p>
              </div>
            </div>
            <div className="show-row">
              <div className="show-group">
                <p>DEFECT: </p>
                <p className="ng-text">{ng.defect}</p>
              </div>
            </div>

            <div className="show-row">
              <div className="show-group">
                <p>MODEL: </p>
                <p className="ng-text">{ng.model}</p>
              </div>
              <div className="show-group">
                <p>QTY: </p>
                <p className="ng-text">{ng.qty}</p>
              </div>
            </div>
            {ng.photo && <img src={ng.photo} alt="NG Photo" className="ng-photo" />}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowNg;
