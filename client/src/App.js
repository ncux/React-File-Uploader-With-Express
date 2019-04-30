import React from 'react';
import './App.css';
import FileUploader from "./components/File-Upload";

function App() {

  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4"><i className="fab fa-react"></i> React File Uploader With Express</h4>

        <FileUploader />
    </div>
  );
}

export default App;
