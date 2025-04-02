import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Query from './Query.tsx';
import Map from './MappedIn.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Query page */}
        <Route path="/" element={<Query />} />

        {/* Route for the Map page */}
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}
