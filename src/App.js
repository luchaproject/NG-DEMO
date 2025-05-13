// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NgStatusProvider } from './contexts/NgStatusContext'; // Import NgStatusProvider
import NgSubmission from './components/ng-submission';
import ShowNg from './components/show-ng';
import ListNg from './components/list-ng';
import MonitorNg from './components/monitor-NG';
import GrafikNg from './components/grafik-ng'; // Import GrafikNg
import alarmSound from './assets/alarm.mp3';
import ShowNgAdmin from './components/show-ng-admin'; // Import ShowNgAdmin
import LoginShow from './components/Login-show';
import LoginList from './components/Login-list';
import ListNgAdmin from './components/list-ng-admin';

const App = () => {
  const [ngData, setNgData] = useState([]);
  const [filterLine, setFilterLine] = useState(''); // State untuk filterLine
  const [alarmSettings, setAlarmSettings] = useState({
    T1: false,
    T2: false,
    T3: false,
    T5: false,
    T6: false,
    OBM1: false,
  });

  const addNgData = (data) => {
    const newData = {
      ...data,
      time: new Date().toLocaleDateString(), // Menambahkan tanggal upload
    };
    setNgData((prevData) => [...prevData, data]);
    triggerAlarm(data); // Panggil fungsi alarm jika data baru masuk
  };

  const triggerAlarm = (data) => {
    const line = data.line;
    if (alarmSettings[line]) {
      const audio = new Audio(alarmSound); // Ganti dengan path file alarm Anda
      audio.play();
    }
  };

  const handleAlarmToggle = (line) => {
    setAlarmSettings((prev) => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  return (
    <NgStatusProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NgSubmission addNgData={addNgData} />} />
          <Route path="/login-list" element={<LoginList />} /> 
          <Route path="/login-show" element={<LoginShow />} /> 
          <Route
            path="/show-ng"
            element={<ShowNg ngData={ngData} filterLine={filterLine} setFilterLine={setFilterLine} />}
          />
          <Route
            path="/show-ng-admin"
            element={<ShowNgAdmin ngData={ngData} filterLine={filterLine} setFilterLine={setFilterLine} />} // Halaman Admin
          />
          <Route path="/list-ng" element={<ListNg ngData={ngData} />} />
          <Route path="/list-ng-admin" element={<ListNgAdmin ngData={ngData} />} /> 
          <Route path="/monitor-ng" element={<MonitorNg ngData={ngData} />} />
          <Route path="/grafik-ng" element={<GrafikNg ngData={ngData} />} />
        </Routes>  
      </Router>
    </NgStatusProvider>
  );
};

export default App;
