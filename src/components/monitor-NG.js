// src/components/monitor-ng.jsx
import React from 'react';
import '../style.css';
import { useNgStatus } from '../contexts/NgStatusContext'; // Import useNgStatus
import { Link } from 'react-router-dom'; // Pastikan impor Link

const MonitorNg = ({ ngData }) => {
  const { ngStatus } = useNgStatus(); // Mengakses ngStatus dari context

  // Line yang akan difilter
  const lines = ['T1', 'T2', 'T3', 'T5', 'T6', 'C1'];

  // Filter data berdasarkan line dan ambil data terbaru
  const latestDataByLine = lines.map((line) => {
    const dataForLine = ngData.filter((ng) => ng.line === line);
    return dataForLine.length > 0 ? dataForLine.sort((a, b) => new Date(b.time) - new Date(a.time))[0] : null;
  });

  return (
    <div className="monitor-ng-container">        
      <header className="header">
        <h1>NG MONITOR</h1>
      </header>

      <div className="ng-list">
        {latestDataByLine.map((ng, index) => {
          if (ng) {
            return (
              <div
                key={ng.id}
                className={`ng-card monitor-ng-card ${ngStatus[ng.id] === 'checked' ? 'checked' : 'unchecked'}`}
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
            );
          } else {
            return (
              <div key={index} className="monitor-ng-card">
                <h4>No data for this line</h4>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MonitorNg;
