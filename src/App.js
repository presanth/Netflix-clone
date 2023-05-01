import React from 'react';
import './App.css';
import Banner from './component/Banner/Banner';
import NavBar from './component/NavBar/NavBar';
import RowPost from './component/RowPost/RowPost';
import { Action, Orginals,Romance,Horror } from './url';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost title = 'Netflix Orginals' url={Orginals} />
      <RowPost title = 'Action' isSmall url={Action} />
      <RowPost title = 'Romance' isSmall url={Romance} />
      <RowPost title = 'Horror' isSmall url={Horror} />
    </div>
  );
}

export default App;