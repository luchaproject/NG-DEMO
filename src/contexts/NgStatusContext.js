// src/contexts/NgStatusContext.js
import React, { createContext, useContext, useState } from 'react';

// Membuat Context untuk status NG
const NgStatusContext = createContext();

// Provider untuk status NG
export const NgStatusProvider = ({ children }) => {
  const [ngStatus, setNgStatus] = useState({}); // Menyimpan status untuk setiap NG card

  // Fungsi untuk toggle status antara checked dan unchecked berdasarkan ID unik
  const toggleStatus = (id) => {
    setNgStatus((prevState) => ({
      ...prevState,
      [id]: prevState[id] === 'checked' ? 'unchecked' : 'checked', // Hanya ubah status data yang diklik
    }));
  };

  return (
    <NgStatusContext.Provider value={{ ngStatus, toggleStatus }}>
      {children}
    </NgStatusContext.Provider>
  );
};

// Custom hook untuk mengakses NgStatusContext
export const useNgStatus = () => useContext(NgStatusContext);
