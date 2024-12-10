import React, {useRef} from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function PrintSTL() {


  function UploadButton() {

  const inputRef = useRef < HTMLInputElement > (null);
  }
  const uploadSTLFile = () => {
    inputRef.current?.click();
  };
  return (
    <>
      <Container fluid>
        <div className="m-3">
          <label className="mx-3">Choose file: </label>
          <input className="d-none" type="file"/>
          <button className="btn btn-outline-primary" onClick={uploadSTLFile}>Upload </button>
        </div>
      </Container>
    </>
  );


}



export default PrintSTL;
