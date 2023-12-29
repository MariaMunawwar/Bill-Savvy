import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Main from './components/Main';
import PredMod from './components/PredMod';
import 'aos/dist/aos.css';
/* import PredictionModal from './components/PredictionModal'; */

function App() {

  return (
    <div className="App">

      <Main />  {/*This renders the video*/}

      <header className="App-header">
        {/* This content should be on top of the video */}
        <Container>
          <h1>BillSavvy - Your Smart Energy Management Solution</h1>
          <p>Are you tired of high electricity bills? Look no further! BillSavvy is here to transform the way you manage your energy consumption and costs.</p>
          {/*<Button variant="primary">Buy Now</Button>*/}
        </Container>
      </header>

       <PredMod />
      
    

    </div>
  );
}

export default App;
