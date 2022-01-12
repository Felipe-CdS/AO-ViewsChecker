import { React, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'

import './styles.css';

function StreamPartyMenu({ name, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true);
      console.log("12165454");
    };
  
    return (
      <>
        <button id="menu-button" onClick={handleShow} className="me-2">
          <img alt="" src="./assets/menu-button.svg"></img>
        </button>
        <Offcanvas show={show} onHide={handleClose} placement={"end"} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Gerador de Stream Parties!</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Placeholder (?)
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}

export default StreamPartyMenu;