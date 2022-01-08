import logo from './logo.svg';
import './App.css';
import {Start} from './Start.js';
import {Test} from './Test.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Fragment } from "react-is";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Start />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
