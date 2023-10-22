"use client"
import React, { useState } from 'react';
import FileUpload from './fileUploadComponent';

const ParentComponent: React.FC = () => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileSelect = (filename: string | null) => {
    setSelectedFileName(filename);
  };

  return (
    <div>
      <FileUpload setFileLoaded={setFileLoaded} onFileSelect={handleFileSelect} />
      {fileLoaded && selectedFileName && (
        <p>Selected File: {selectedFileName}</p>
      )}
    </div>
  );
};

export default ParentComponent;
