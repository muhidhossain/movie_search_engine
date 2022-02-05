import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Details from './pages/details';
import List from './pages/list';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<List />}>
          <Route path="/list" element={<List />} />
        </Route>
        <Route path="/:details" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
