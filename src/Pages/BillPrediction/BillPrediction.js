import './BillPrediction.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import Main from "../../Components/Main";
import PredMod from '../../Components/PredMod';
import PredictionModal from '../../Components/PredictionModal';
import NotificationComponent from '../../Components/NotificationComponent';
import 'aos/dist/aos.css';


function BillPrediction() {

  return (
    <div className="App1">

<Main />  {/*This renders the video*/}

      <header className="App-header">
        {/* This content should be on top of the video */}
        <Container>
          <h1>BillSavvy - Your Smart Energy Management Solution</h1>
          <p>Are you tired of high electricity bills? Look no further! BillSavvy is here to transform the way you manage your energy consumption and costs.</p>
          {/*<Button variant="primary">Buy Now</Button>*/}
        </Container>
      </header>
  <NotificationComponent />

 {/* <PredictionModal /> */}
 <PredMod />

    </div>
  );
}

export default BillPrediction;
