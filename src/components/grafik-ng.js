import React from 'react';
import '../style.css';
import { Bar, Line } from 'react-chartjs-2'; // Import Bar dan Line chart dari react-chartjs-2
import { Chart as ChartJS } from 'chart.js/auto'; // Import Chart.js secara otomatis
import moment from 'moment'; // Menggunakan moment.js untuk manipulasi waktu
import { Link } from 'react-router-dom'; // Pastikan impor Link

const GrafikNg = ({ ngData }) => {
  // Line yang akan difilter
  const lines = ['T1', 'T2', 'T3', 'T5', 'T6', 'C1'];

  // Fungsi untuk menghitung jumlah defect per waktu (menit)
  const getDefectsPerTime = (line) => {
    // Filter data berdasarkan line
    const dataForLine = ngData.filter((ng) => ng.line === line);

    // Ambil waktu yang diupload (format jam:menit) dan urutkan berdasarkan waktu terbaru
    const times = Array.from(
      new Set(dataForLine.map((ng) => moment(ng.time).format('HH:mm')))
    ).sort((a, b) => moment(b, 'HH:mm').diff(moment(a, 'HH:mm'))); // Urutkan waktu dari terbaru ke terlama

    // Hitung jumlah defect per waktu (menit)
    const defectCountPerTime = times.map((time) => {
      return dataForLine.filter(
        (ng) => moment(ng.time).format('HH:mm') === time
      ).length;
    });

    return { times, defectCountPerTime };
  };

  // Membuat data untuk setiap line
  const chartData = lines.map((line) => {
    const { times, defectCountPerTime } = getDefectsPerTime(line);

    return {
      labels: times.reverse(), // Waktu yang diurutkan (terbaru ke terlama), reverse agar terbaru di kanan
      datasets: [
        {
          label: `Jumlah Defect - ${line} (Bar)`,
          data: defectCountPerTime,
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Warna grafik batang
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          type: 'bar', // Jenis grafik: Bar chart
        },
        {
          label: `Jumlah Defect - ${line} (Line)`,
          data: defectCountPerTime,
          borderColor: 'rgba(54, 162, 235, 1)', // Warna grafik garis
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
          type: 'line', // Jenis grafik: Line chart
        },
      ],
    };
  });

  return (
    <div className="grafik-ng-container">
      <div className="top-navigation">
        <Link to="/show-ng">
          <button className="top-button">SHOW NG</button>
        </Link>
        <Link to="/list-ng">
          <button className="top-button">NG LIST</button>
        </Link>
        <Link to="/">
          <button className="top-button">HOME</button>
        </Link>
        <Link to="/monitor-NG">
          <button className="top-button">MONITOR</button>
        </Link>
        <Link to="/grafik-ng">
          <button className="graph-button">GRAPH</button>
        </Link>
      </div>

      <header className="header">
        <h1>Grafik Jumlah Defect per Line</h1>
      </header>

      <div className="ng-charts">
        {chartData.map((data, index) => (
          <div key={index} className="ng-chart-container">
            <h2>{lines[index]}</h2>
            <Bar data={data} options={{ responsive: true }} />
            {/* Menampilkan grafik kombinasi untuk setiap line */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrafikNg;
