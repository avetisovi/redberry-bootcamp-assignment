import './fonts/HelveticaNeue-300.ttf';
import './fonts/HelveticaNeue-400.ttf';
import './fonts/HelveticaNeue-500.ttf';
import './fonts/HelveticaNeue-700.ttf';
import './styles/index.scss';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';

import LaptopsList from './pages/LaptopsList';
import LaptopItem from './pages/LaptopItem';

function App() {
  document.querySelector('body').style.overflow = 'auto';
  document.querySelector('html').style.overflow = 'auto';

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form" element={<Form />} />
          <Route path="/laptops" element={<LaptopsList />} />
          <Route path="/laptops/:id" element={<LaptopItem />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
