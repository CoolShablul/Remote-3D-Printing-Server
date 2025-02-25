import React, {useState} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";


import {warmPrinterBed, warmPrinterHead} from "../utill/api";

const PrinterActions = () => {

    const [printerAction, setPrinterAction ] = useState({})

    const handleAction = () => {
      try {
          if (printerAction.nozzleTemp){
              console.log('warming nozzle');
              warmPrinterHead({ temperature: printerAction.nozzleTemp});
          }
          if (printerAction.bedTemp){
              console.log(`warming bed to: ${printerAction.bedTemp}`);
              warmPrinterBed({ temperature: printerAction.bedTemp});
          }
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
                      <Card.Title as="h4">Printer Actions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <>
                            <Row>
                              <Col className="px-1" md="4">
                                <Form.Group className="nozzle-temperature">
                                  <label>Nozzle Temperature:</label>
                                  <Form.Control
                                      placeholder="Nozzle Temperature"
                                      type="text"
                                      value={printerAction.nozzleTemp}
                                      onChange={(e) =>
                                          setPrinterAction((printerAction) => ({
                                            ...printerAction,
                                            nozzleTemp: e.target.value,
                                          }))
                                      }
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="px-1" md="4">
                                <Form.Group className="bed-temperature">
                                  <label>Bed Temperature:</label>
                                  <Form.Control
                                      type="text"
                                      value={printerAction.bedTemp}
                                      onChange={(e) =>
                                          setPrinterAction((printerAction) => ({
                                            ...printerAction,
                                            bedTemp: e.target.value
                                          }))
                                      }
                                      placeholder="Bed Temperature"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                              <Row>
                                <Col>
                                  <div className="d-flex justify-content-center">
                                    <Button variant="primary" onClick={handleAction}>
                                      Send to Printer
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
      );
}

export default PrinterActions;
