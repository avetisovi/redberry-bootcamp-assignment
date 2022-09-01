import './fonts/HelveticaNeue.ttc';
import './styles/index.scss';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';

import { LaptopsContext } from './context';
import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import LaptopsList from './pages/LaptopsList';
import LaptopItem from './pages/LaptopItem';

function App() {
  const [laptops, setLaptops] = useState([]);
  useEffect(() => {
    fetchData(
      'https://pcfy.redberryinternship.ge/api/laptops?token=ab09d65821320a72cc4969433abaaebf'
    ).then(setLaptops);
  }, []);
  return (
    <div className="App">
      <LaptopsContext.Provider
        value={{
          laptops
        }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/form" element={<Form />} />
            <Route path="/laptops" element={<LaptopsList />} />
            <Route path="/laptops/:id" element={<LaptopItem />} />
          </Routes>
        </HashRouter>
      </LaptopsContext.Provider>
    </div>
  );
}

export default App;
