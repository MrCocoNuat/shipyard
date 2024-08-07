import logo from './logo.svg';
import './App.css';
import * as hullDefinitions from './specs/hulls.json';
import Select from 'react-select'
import { useState } from 'react';

function App() {
  const [hull, setHull] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <Select options={Array.from(hullDefinitions).map(hullDefinition => ({value: hullDefinition, label: hullDefinition.name}))} onChange={(hullDefinition) => {console.log(hullDefinition); setHull(hullDefinition.value)}}/>
        <p>{hull && hull.maxMass}</p>
      </header>
    </div>
  );
}

export default App;
