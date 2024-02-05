// App.js
import React from 'react';
import Register from './components/register/register'; // Adjust the path based on your project structure
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
