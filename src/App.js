import './fonts/HelveticaNeue.ttc';
import './styles/index.scss';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
