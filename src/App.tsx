import Map from './components/Map';
import Legend from './components/Legend';
import Sidebar from './components/Sidebar';
import "./App.css";
import { atom } from 'jotai'

export const yearAtom = atom("YEAR");
export const hoveredStateAtom = atom("STATE");
export const selectedSectorAtom = atom("");
export const hoveredStateCodeAtom = atom("");
export const hoveredCountyAtom = atom("COUNTY");
export const sectorOptionsAtom = atom([{ value: 'Select a year to display sectors', label: 'Select a year to display sectors', color: 'black', isDisabled: true }]);
export const quantilesAtom = atom([0, 10, 20, 50, 100, 200, 500, 1000]);
export const employmentAtom = atom({});
export const topSectorsMapAtom = atom({});
export const dataAvaliableAtom = atom(true);


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
