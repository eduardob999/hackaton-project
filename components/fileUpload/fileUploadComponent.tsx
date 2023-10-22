// FileUpload.tsx
import React, { useState, useCallback } from 'react';
import axios from 'axios';

interface FileUploadProps {
  setFileLoaded: (loaded: boolean) => void;
  onFileSelect: (filename: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFileLoaded, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileLoaded(true);
      if (file.name) {
        setFileName(file.name)
      }
    }
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile || uploading) {
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/utils/uploadApi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      onFileSelect(fileName);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setSelectedFile(null);
      setFileLoaded(false);
      setUploading(false);
    }
  }, [selectedFile, setUploading, setFileLoaded]);

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <input type="file" onChange={handleFileChange} />
          <br/><br/>
          <button onClick={handleUpload} disabled={!selectedFile || uploading}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
