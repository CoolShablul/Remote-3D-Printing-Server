import React, {useState} from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Button,
  Container,
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
        <div className="upload-file-container">
          <label
              className="upload-button-text">
              Choose file:
          </label>
          <Button
              className="upload-button"
              onClick={UploadButton}>Upload
          </Button>
          <input
              className="upload-input"
              type="file"
              id="fileInput"
              onChange={handleFileChange}/>
          <p>{fileName ? `Selected file: ${fileName}` : ''}</p>
        </div>


        <div className="slicer-options">
          <h2>Slic3r Configuration</h2>

          <div className="nozzle-temperature">
            <label>Nozzle Temperature: </label>
            <input
                className="nozzle-temperature-input"
                type="text"
                value={nozzleTemp}
                onChange={(e) => setNozzleTemp(e.target.value)}
            />
          </div>

          <div className="bed-temperature">
            <label>Bed Temperature: </label>
            <input
                className="bed-temperature-input"
                type="text"
                value={bedTemp}
                onChange={(e) => setBedTemp(e.target.value)}
            />
          </div>

          <div className="infill-percentage">
            <label>Infill Percentage: </label>
            <input
                className="infill-percentage-input"
                type="text"
                value={infillPercent}
                onChange={(e) => setInfillPercent(e.target.value)}
            />
          </div>

          <div className="infill-pattern">
            <label>Infill Pattern: </label>
            <select
                className="infill-pattern-dropdown"
                value={infillPattern}
                onChange={(e) => setInfillPattern(e.target.value)}
            >
              <option value="rectilinear">Rectilinear</option>
              <option value="honeycomb">Honeycomb</option>
              <option value="gyroid">Gyroid</option>
            </select>
          </div>

          <div className="adhesion-type">
            <label>Adhesion Type: </label>
            <select
                className="adhesion-type-dropdown"
                value={adhesionType}
                onChange={(e) => setAdhesionType(e.target.value)}
            >
              <option value="none">None</option>
              <option value="skirt">Skirt</option>
              <option value="brim">Brim</option>
              <option value="raft">Raft</option>
            </select>
          </div>

          <div className="support-type">
            <label>Support Type: </label>
            <select
                className="support-type-dropdown"
                value={supportType}
                onChange={(e) => setSupportType(e.target.value)}
            >
              <option value="none">None</option>
              <option value="tree">Tree</option>
              <option value="standard">Standard</option>
            </select>
          </div>

          <button onClick={handleSave}>Save Config</button>
        </div>
      </Container>
    </>
  );
};

export default PrintSTL;
