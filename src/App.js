import './fonts/HelveticaNeue.ttc';
import './styles/index.scss';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
