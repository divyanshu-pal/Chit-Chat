import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login'
import Chatt from "./pages/Chatt";
import SetAvatar from './components/SetAvatar'
import './App.css';

function App() {
  return (
       <BrowserRouter>
          <Routes>
             <Route path="/register" element={<Register/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/setAvatar" element={<SetAvatar />} />
             <Route path="/" element={<Chatt/>}/>
          </Routes> 
       </BrowserRouter>
  );
}

export default App;
