import React from 'react';
import { Container } from 'react-bootstrap';
import Main from './Components/Main';
import PredMod from './Components/PredMod';
import PredictionForm from './Components/PredictionModal'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './App.css';

function HomePage() {
  return (
    <>
      <Main />  {/* This renders the video */}

      <header className="App-header">
        {/* This content should be on top of the video */}
        <Container>
          <h1>BillSavvy - Your Smart Energy Management Solution</h1>
          <p>Are you tired of high electricity bills? Look no further! BillSavvy is here to transform the way you manage your energy consumption and costs.</p>
        </Container>
      </header>

      <PredMod />
      <PredictionForm />
    </>
  );
}