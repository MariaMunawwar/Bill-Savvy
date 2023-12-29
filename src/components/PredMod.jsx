import '../App.css';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import PredictionForm from './PredictionModal'; 
import { Button, Modal} from 'react-bootstrap';

const PredMod = () => { 
    const [modalShow, setModalShow] = useState(false);
     // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
    });
  }, []);
    return (
        <section id='subheader' className=''>
            <div className='container-fluid nav_bg'>
                <div className='row'>
                    <div className='col-md-6 pt-5 pt-lg-0 order-2 order-lg-1' data-aos='fade-right'>
                        <h1>Make Your Upcoming Bill Predictions</h1>
                        <p className='my-3'>With our advanced predictive technology, BillSavvy takes the guesswork out of your monthly bills. <br></br>
                        Let us forecast your future expenses with precision. </p>
                        <div className='mt-3'>
                        <Button className='btn-get-started' onClick={() => setModalShow(true)}>
                            Make Predictions
                        </Button>

                        </div>
                    </div>

                    <div className='col-lg-6 order-1 order-lg-2 header-img' data-aos='fade-right'>
                        <img src="predimg.png" className="img-fluid animated" alt="predimage" />
                    </div>
                </div>
            </div>

            <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/*<Modal.Title id="contained-modal-title-vcenter">
            Make Your Bill Predictions
    </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <PredictionForm />
        </Modal.Body>
      </Modal>

        </section>
    )
}

export default PredMod;