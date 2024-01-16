import './App.css';
import './Pages/BillPrediction/BillPrediction.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BillPrediction from "./Pages/BillPrediction/BillPrediction";
import Login from "./Pages/Login/Login";
import Signup from './Pages/SignUp/Signup';
import Dashboard from "./Pages/Dashboard/Dashboard";
import TipsandReducedBill from './Pages/TipsandReduced Bill/TipsandReducedBill';
import Blog from './Pages/Blog/index';
import Home from './Pages/Home/index';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Main from './Components/Main';
import PredMod from './Components/PredMod';
import 'aos/dist/aos.css';
import PredictionForm from './Components/PredictionModal'; 


function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' exact Component={Login} />
      <Route path='/signup' Component={Signup} />
      <Route path='/billprediction' exact Component={BillPrediction} />
      <Route path='/dashboard' Component={Dashboard} />
      <Route path='/tips' Component={TipsandReducedBill} />
      <Route path="/bloghome"  element={<Home />} />
      <Route path="/blog/:id"  element={<Blog/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;