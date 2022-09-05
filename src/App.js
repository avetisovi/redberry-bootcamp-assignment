import './fonts/HelveticaNeue-300.ttf';
import './fonts/HelveticaNeue-400.ttf';
import './fonts/HelveticaNeue-500.ttf';
import './fonts/HelveticaNeue-700.ttf';
import './styles/index.scss';

import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';
import ServerError from './components/UI/ServerError/ServerError';
import { ServerErrorContext } from './context';

import LaptopsList from './pages/LaptopsList';
import LaptopItem from './pages/LaptopItem';

function App() {
  document.querySelector('body').style.overflow = 'auto';
  document.querySelector('html').style.overflow = 'auto';

  const [serverError, setServerError] = useState(false);
  const [errorText, setErrorText] = useState('');

  return (
    <ServerErrorContext.Provider
      value={{ serverError, setServerError, errorText, setErrorText }}
    >
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/form" element={<Form />} />
            <Route path="/laptops" element={<LaptopsList />} />
            <Route path="/laptops/:id" element={<LaptopItem />} />
          </Routes>
        </HashRouter>

        <ServerError />
      </div>
    </ServerErrorContext.Provider>
  );
}

export default App;
