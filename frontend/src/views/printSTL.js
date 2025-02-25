import React, {useState} from "react";
import {
  Button, Card, Col,
  Container, Form, Row,
} from "react-bootstrap";
import { uploadFileAndPrint } from '../utill/api';

const PrintSTL = () => {

  const [file, setFile] = useState('');

  const [inputType, setInputType] = useState('form');
  const [customSettings, setCustomSettings] = useState('');
  const [printerConfig, setPrinterConfig ] = useState({})


  const UploadButton = () => {
    document.getElementById('fileInput').click();

  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

  }

  const handleSave = () => {
    const lines = customSettings.split('\n'); // Split input by lines
    const updatedConfig = { ...printerConfig };

    lines.forEach((line) => {
      const [key, value] = line.split(/[:=]/).map((item) => item.trim()); // Split by ':' or '=' and trim spaces
      if (key && value) {
        updatedConfig[key] = value; // Update config with parsed key-value pairs
      }
    });

    try {
      setPrinterConfig(updatedConfig); // Update state
      console.log(updatedConfig); // Use the updated config immediately
      uploadFileAndPrint(updatedConfig, file); // Send updated config
    } catch (e) {
      console.error(e);
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
                  <Row>
                    <Col className="pr-1" md="2">
                      <div className="upload-file-container">
                        <label className="upload-button-text">Choose file:</label>
                        <Button className="upload-button" onClick={UploadButton}>
                          Upload
                        </Button>
                        <input
                            className="upload-input"
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <p>{file ? `Selected file: ${file.name}` : ''}</p>
                      </div>
                    </Col>
                  </Row>
                  <Form>
                    <Row className="mb-3">
                      <Col>
                        <Form.Check
                            type="radio"
                            id="formOption"
                            name="inputType"
                            label="Use Slicer Settings Form"
                            checked={inputType === 'form'}
                            onChange={() => setInputType('form')}
                        />
                        <Form.Check
                            type="radio"
                            id="textOption"
                            name="inputType"
                            label="Use Freeform Text Input"
                            checked={inputType === 'text'}
                            onChange={() => setInputType('text')}
                        />
                      </Col>
                    </Row>

                    {inputType === 'form' ? (
                        <>
                          <Row>
                            <Col className="px-1" md="4">
                              <Form.Group className="nozzle-temperature">
                                <label>Nozzle Temperature:</label>
                                <Form.Control
                                    placeholder="Nozzle Temperature"
                                    type="text"
                                    value={printerConfig.temperature}
                                    onChange={(e) =>
                                        setPrinterConfig((printerConfig) => ({
                                          ...printerConfig,
                                          temperature: e.target.value,
                                        }))
                                    }
                                />
                              </Form.Group>
                            </Col>
                            <Col className="px-1" md="4">
                              <Form.Group className="bed-temperature">
                                <label>Bed Temperature:</label>
                                <Form.Control
                                    type="text"
                                    value={printerConfig['bed-temperature']}
                                    onChange={(e) =>
                                        setPrinterConfig((printerConfig) => ({
                                          ...printerConfig,
                                          'bed-temperature': e.target.value,
                                          'first_layer_bed_temperature': e.target.value,
                                        }))
                                    }
                                    placeholder="Bed Temperature"
                                />
                              </Form.Group>
                            </Col>
                            <Col className="pl-1" md="4">
                              <Form.Group className="infill-density">
                                <label>Infill Percentage:</label>
                                <Form.Control
                                    type="text"
                                    value={printerConfig['fill-density']}
                                    onChange={(e) =>
                                        setPrinterConfig((printerConfig) => ({
                                          ...printerConfig,
                                          'fill-density': e.target.value,
                                        }))
                                    }
                                    placeholder="Infill Density"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="6">
                              <label>Infill Pattern:</label>
                              <Form.Select
                                  aria-label="infill pattern"
                                  value={printerConfig['fill-pattern']}
                                  onChange={(e) =>
                                      setPrinterConfig((printerConfig) => ({
                                        ...printerConfig,
                                        'fill-pattern': e.target.value,
                                      }))
                                  }
                              >
                                <option value="rectilinear">Rectilinear</option>
                                <option value="honeycomb">Honeycomb</option>
                                <option value="gyroid">Gyroid</option>
                              </Form.Select>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="6">
                              <label>Adhesion Type:</label>
                              <Form.Select
                                  className="adhesion-type-dropdown"
                                  value={printerConfig['brim-type']}
                                  onChange={(e) =>
                                      setPrinterConfig((printerConfig) => ({
                                        ...printerConfig,
                                        'brim-type': e.target.value,
                                      }))
                                  }
                              >
                                <option value="none">None</option>
                                <option value="skirt">Skirt</option>
                                <option value="brim">Brim</option>
                                <option value="raft">Raft</option>
                              </Form.Select>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="pr-1" md="6">
                              <label>Support Type:</label>
                              <Form.Select
                                  className="support-type-dropdown"
                                  value={printerConfig.support_type}
                                  onChange={(e) =>
                                      setPrinterConfig((printerConfig) => ({
                                        ...printerConfig,
                                        support_type: e.target.value,
                                      }))
                                  }
                              >
                                <option value="none">None</option>
                                <option value="tree">Tree</option>
                                <option value="standard">Standard</option>
                              </Form.Select>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="d-flex justify-content-center">
                                <Button variant="primary" onClick={handleSave}>
                                  Save
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </>
                    ) : (
                        <Row>
                          <Col>
                            <Form.Group>
                              <label>Custom Slicer Settings:</label>
                              <Form.Control
                                  as="textarea"
                                  rows={6}
                                  style ={{ height:'200px'}}
                                  placeholder="Enter custom slicer settings here..."
                                  value={customSettings}
                                  onChange={(e) => {
                                    console.log(e.target.value)
                                    setCustomSettings(e.target.value)
                                  }}

                              />
                            </Form.Group>
                          </Col>
                          <Row>
                            <Col>
                              <div className="d-flex justify-content-center">
                                <Button variant="primary" onClick={handleSave}>
                                  Save
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Row>
                    )}
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
