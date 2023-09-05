import { useState } from 'react';
import Map from './components/Map';
import Legend from './components/Legend';
import Sidebar from './components/Sidebar';
import "./App.css";
const App: React.FC = () => {
  return (
    <div className="app font-mono flex">
      <Sidebar />
      <div className="flex-grow">
        <Map />
      </div>
      <Legend />
    </div>
  );
};

export default App;
