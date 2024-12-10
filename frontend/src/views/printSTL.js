import React, {useState} from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Button, Card, Col,
  Container, Form, Row,
} from "react-bootstrap";

const PrintSTL = () => {

  const [fileName, setFileName] = useState('');

  const UploadButton = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No File Selected");
  }


  //___________________________________________________________________________________

  const [nozzleTemp, setNozzleTemp] = useState('');
  const [bedTemp, setBedTemp] = useState('');
  const [infillPercent, setInfillPercent] = useState('');
  const [infillPattern, setInfillPattern] = useState('');
  const [adhesionType, setAdhesionType] = useState('');
  const [supportType, setSupportType] = useState('');

  const handleSave = () => {
    const config = `${nozzleTemp ? 'nozzle_temperature = ' + nozzleTemp : ''}
      ${bedTemp ? 'bed_temperature = ' + bedTemp : ''}
      ${infillPercent ? 'infill_percentage = ' + infillPercent : ''}
      ${infillPattern ? 'infill_pattern = '+ infillPattern : ''}
      ${adhesionType ? 'adhesion_type = ' + adhesionType : ''}
      ${supportType ? 'support_type = ' + supportType : ''}
  `.trim();

    const blob = new Blob([config], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'config.ini';
    link.click();
  };

  //__________________________________________________________________________________

  return (
  <>
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Upload and Slice STL File</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="5">
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
                      <p>{fileName ? `Selected file: ${fileName}` : ''}</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="nozzle-temperature">
                      <label>Nozzle Temperature:</label>
                      <Form.Control
                          placeholder="Nozzle Temperature"
                          type="text"
                          value={nozzleTemp}
                          onChange={(e) => setNozzleTemp(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="3">
                    <Form.Group className="bed-temperature">
                      <label>Bed Temperature: </label>
                      <Form.Control
                          className="bed-temperature-input"
                          type="text"
                          value={bedTemp}
                          onChange={(e) => setBedTemp(e.target.value)}
                          placeholder="Bed Temperature"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pl-1" md="4">
                    <Form.Group className="infill-percentage">
                      <label>Infill Percentage: </label>
                      <Form.Control
                          className="infill-percentage-input"
                          type="text"
                          value={infillPercent}
                          onChange={(e) => setInfillPercent(e.target.value)}
                          placeholder="Infill Percentage"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="pr-1" md="6">
                    <label>Infill Pattern:</label>
                    <Form.Select aria-label="infill pattern">
                      value={infillPattern}
                      onChange={(e) => setInfillPattern(e.target.value)}
                      {/*<option Select Pattern </option>*/}
                      <option value="rectilinear">Rectilinear</option>
                      <option value="honeycomb">Honeycomb</option>
                      <option value="gyroid">Gyroid</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl-1" md="6">
                    <label>Adhesion Type: </label>
                    <Form.Select className="infill-pattern">
                        className="adhesion-type-dropdown"
                        value={adhesionType}
                        onChange={(e) => setAdhesionType(e.target.value)}
                        <option value="none">None</option>
                        <option value="skirt">Skirt</option>
                        <option value="brim">Brim</option>
                        <option value="raft">Raft</option>
                    </Form.Select>

                      <label>Support Type: </label>
                      <Form.Select className="support-type">
                          className="support-type-dropdown"
                          value={supportType}
                          onChange={(e) => setSupportType(e.target.value)}
                        <option value="none">None</option>
                        <option value="tree">Tree</option>
                        <option value="standard">Standard</option>
                  </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary">Save</Button>
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
