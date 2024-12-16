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

  const parseCustomSettings = () => {
    const lines = customSettings.split('\n'); // Split input by lines
    const updatedConfig = { ...printerConfig };

    lines.forEach((line) => {
      const [key, value] = line.split(/[:=]/).map((item) => item.trim()); // Split by ':' or '=' and trim spaces
      if (key && value) {
        updatedConfig[key] = value; // Update config with parsed key-value pairs
      }
    });

    setPrinterConfig(updatedConfig); // Update the state
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

                                        }))
                                    }
                                    placeholder="Bed Temperature"
                                />
                              </Form.Group>
                            </Col>
                            <Col className="pl-1" md="4">
                              <Form.Group className="infill-percentage">
                                <label>Infill Percentage:</label>
                                <Form.Control
                                    type="text"
                                    value={printerConfig['fill-percentage']}
                                    onChange={(e) =>
                                        setPrinterConfig((printerConfig) => ({
                                          ...printerConfig,
                                          'fill-percentage': e.target.value,
                                        }))
                                    }
                                    placeholder="Infill Percentage"
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
                                  placeholder="Enter custom slicer settings here..."
                                  value={customSettings}
                                  onChange={(e) => setCustomSettings(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Row>
                            <Col>
                              <div className="d-flex justify-content-center">
                                <Button variant="primary" onClick={() => {parseCustomSettings(); handleSave();}}>
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

  //     <>
  //   <Container fluid>
  //     <Row>
  //       <Col md="10">
  //         <Card>
  //           <Card.Header>
  //             <Card.Title as="h4">Upload and Slice STL File</Card.Title>
  //           </Card.Header>
  //           <Card.Body>
  //             <Form>
  //               <Row>
  //                 <Col className="pr-1" md="2">
  //                   <div className="upload-file-container">
  //                     <label
  //                         className="upload-button-text">
  //                       Choose file:
  //                     </label>
  //                     <Button
  //                         className="upload-button"
  //                         onClick={UploadButton}>
  //                       Upload
  //                     </Button>
  //                     <input
  //                         className="upload-input"
  //                         type="file"
  //                         id="fileInput"
  //                         onChange={handleFileChange}
  //                         style={{ display: 'none' }}/>
  //                     <p>{file ? `Selected file: ${file.name}` : ''}</p>
  //                   </div>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col className="px-1" md="4">
  //                   <Form.Group className="nozzle-temperature">
  //                     <label>Nozzle Temperature:</label>
  //                     <Form.Control
  //                         placeholder="Nozzle Temperature"
  //                         type="text"
  //                         value={printerConfig.temperature}
  //                         onChange={(e) => setPrinterConfig(printerConfig => ({
  //                           ...printerConfig,
  //                           temperature: e.target.value
  //                             }))}
  //                     />
  //                   </Form.Group>
  //                 </Col>
  //                 <Col className="px-1" md="4">
  //                   <Form.Group className="bed-temperature">
  //                     <label>Bed Temperature: </label>
  //                     <Form.Control
  //                         className="bed-temperature-input"
  //                         type="text"
  //                         value={printerConfig['bed-temperature']}
  //                         onChange={(e) => setPrinterConfig(printerConfig => ({
  //                           ...printerConfig,
  //                           'bed-temperature': e.target.value
  //                         }))}
  //                         placeholder="Bed Temperature"
  //                     />
  //                   </Form.Group>
  //                 </Col>
  //                 <Col className="pl-1" md="4">
  //                   <Form.Group className="infill-percentage">
  //                     <label>Infill Percentage: </label>
  //                     <Form.Control
  //                         className="infill-percentage-input"
  //                         type="text"
  //                         value={printerConfig[fill-percentage]}
  //                         onChange={(e) => setPrinterConfig(printerConfig => ({
  //                           ...printerConfig,
  //                           'fill-percentage' : e.target.value
  //                         }))}
  //                         placeholder="Infill Percentage"
  //                     ></Form.Control>
  //                   </Form.Group>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col className="pr-1" md="6">
  //                   <label>Infill Pattern:</label>
  //                   <Form.Select aria-label="infill pattern"
  //                     value={printerConfig[fill-pattern]}
  //                     onChange={(e) => setPrinterConfig(printerConfig => ({
  //                     ...printerConfig,
  //                     'fill-pattern' : e.target.value
  //                   }))}
  //                   >
  //                     <option value="rectilinear">Rectilinear</option>
  //                     <option value="honeycomb">Honeycomb</option>
  //                     <option value="gyroid">Gyroid</option>
  //                   </Form.Select>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col className="pr-1" md="6">
  //                   <label>Adhesion Type: </label>
  //                   <Form.Select className="infill-pattern">
  //                       className="adhesion-type-dropdown"
  //                       value={printerConfig[brim-type]}
  //                       onChange={(e) => setPrinterConfig(printerConfig => ({
  //                       ...printerConfig,
  //                       'brim-type' : e.target.value
  //                   }))}
  //                       <option value="none">None</option>
  //                       <option value="skirt">Skirt</option>
  //                       <option value="brim">Brim</option>
  //                       <option value="raft">Raft</option>
  //                   </Form.Select>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col className="pr-1" md="6">
  //                     <label>Support Type: </label>
  //                     <Form.Select
  //                         className="support-type-dropdown"
  //                         value={printerConfig.support_type}
  //                         onChange={(e) => setPrinterConfig(printerConfig => ({
  //                           ...printerConfig,
  //                           support_type: e.target.value
  //                         }))} >
  //                       <option value="none">None</option>
  //                       <option value="tree">Tree</option>
  //                       <option value="standard">Standard</option>
  //                 </Form.Select>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <div className="d-flex justify-content-center">
  //                     <Button variant="primary" onClick={handleSave}>Save</Button>
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </Form>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     </Row>
  //
  //   </Container>
  // </>
);
};


export default PrintSTL;
