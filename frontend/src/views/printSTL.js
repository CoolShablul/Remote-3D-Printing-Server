import React, {useState} from "react";
import {
  Button, Card, Col,
  Container, Form, Row,
} from "react-bootstrap";
import { uploadFileAndPrint } from '../utill/api';

const PrintSTL = () => {

  const [file, setFile] = useState('');

  const UploadButton = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  const [printerConfig, setPrinterConfig ] = useState({
  })

  const handleSave = () => {
    try {
        uploadFileAndPrint(printerConfig, file);
        //pop up printing has started
    }
    catch (e) {
      //popup there is a prob with the printing
      console.log(e);
    }
  };

  return (
  <>
    <Container fluid>
      <Row>
        <Col md="10">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Upload and Slice STL File</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="2">
                    <div className="upload-file-container">
                      <label
                          className="upload-button-text">
                        Choose file:
                      </label>
                      <Button
                          className="upload-button"
                          onClick={UploadButton}>
                        Upload
                      </Button>
                      <input
                          className="upload-input"
                          type="file"
                          id="fileInput"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}/>
                      <p>{file ? `Selected file: ${file.name}` : ''}</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-1" md="4">
                    <Form.Group className="nozzle-temperature">
                      <label>Nozzle Temperature:</label>
                      <Form.Control
                          placeholder="Nozzle Temperature"
                          type="text"
                          value={printerConfig.temperature}
                          onChange={(e) => setPrinterConfig(printerConfig => ({
                            ...printerConfig,
                            temperature: e.target.value
                              }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="4">
                    <Form.Group className="bed-temperature">
                      <label>Bed Temperature: </label>
                      <Form.Control
                          className="bed-temperature-input"
                          type="text"
                          value={printerConfig['bed-temperature']}
                          onChange={(e) => setPrinterConfig(printerConfig => ({
                            ...printerConfig,
                            'bed-temperature': e.target.value
                          }))}
                          placeholder="Bed Temperature"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group className="infill-percentage">
                      <label>Infill Percentage: </label>
                      <Form.Control
                          className="infill-percentage-input"
                          type="text"
                          value={printerConfig[fill-percentage]}
                          onChange={(e) => setPrinterConfig(printerConfig => ({
                            ...printerConfig,
                            'fill-percentage' : e.target.value
                          }))}
                          placeholder="Infill Percentage"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <label>Infill Pattern:</label>
                    <Form.Select aria-label="infill pattern"
                      value={printerConfig[fill-pattern]}
                      onChange={(e) => setPrinterConfig(printerConfig => ({
                      ...printerConfig,
                      'fill-pattern' : e.target.value
                    }))}
                    >
                      <option value="rectilinear">Rectilinear</option>
                      <option value="honeycomb">Honeycomb</option>
                      <option value="gyroid">Gyroid</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <label>Adhesion Type: </label>
                    <Form.Select className="infill-pattern">
                        className="adhesion-type-dropdown"
                        value={printerConfig[brim-type]}
                        onChange={(e) => setPrinterConfig(printerConfig => ({
                        ...printerConfig,
                        'brim-type' : e.target.value
                    }))}
                        <option value="none">None</option>
                        <option value="skirt">Skirt</option>
                        <option value="brim">Brim</option>
                        <option value="raft">Raft</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                      <label>Support Type: </label>
                      <Form.Select
                          className="support-type-dropdown"
                          value={printerConfig.support_type}
                          onChange={(e) => setPrinterConfig(printerConfig => ({
                            ...printerConfig,
                            support_type: e.target.value
                          }))} >
                        <option value="none">None</option>
                        <option value="tree">Tree</option>
                        <option value="standard">Standard</option>
                  </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" onClick={handleSave}>Save</Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  </>
);
};


export default PrintSTL;
