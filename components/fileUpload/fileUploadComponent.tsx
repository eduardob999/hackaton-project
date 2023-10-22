// FileUpload.tsx
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Input } from "@material-tailwind/react";

interface FileUploadProps {
  setFileLoaded: (loaded: boolean) => void;
  onFileSelect: (filename: string | null, textContent: string) => void; // Updated onFileSelect
}

const FileUpload: React.FC<FileUploadProps> = ({ setFileLoaded, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string>(''); // New state for text input content

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileLoaded(true);
      if (file.name) {
        setFileName(file.name);
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
      onFileSelect(fileName, textContent); // Pass textContent to onFileSelect
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setSelectedFile(null);
      setFileLoaded(false);
      setUploading(false);
    }
  }, [selectedFile, fileName, setUploading, setFileLoaded, textContent]); // Include textContent in the dependencies

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Cargue una imagen o un pdf:</h2>
          <br />
            <h3 className="text-x0.7">- El archivo no debe exeder 1mb en tamaño</h3>
            <h3 className="text-x0.7">- Los archivos de tipo pdf no tbene tener más de 3 páginas</h3>
          <br />
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            onChange={handleFileChange}
          />
          <br />
          <h2 className="text-xl font-semibold">¿Qué quieres información deseas obtener del texto?</h2>
          <br />
          <h3 className="text-x0.7">- Extraer ideas principales</h3>
          <h3 className="text-x0.7">- Resume de qué trata el artículo</h3>
          <h3 className="text-x0.7">- A qué tipo de comunidad científica pertenece.</h3>
          <h3 className="text-x0.7">- Cuáles documentos guardados en el sistema se correlacionan.</h3>
          <h3 className="text-x0.7">- Inserte una pregunta adicional</h3>
          <h3 className="text-x0.7">- Traducir al idioma:_______</h3>
          <br />
          <Input
            crossOrigin=""
            type="text"
            size="lg"
            placeholder="Escribe tu pregunta aquí"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />
          <br />
          <br />
          <Button className="mt-6 bg-slate-200" fullWidth onClick={handleUpload} disabled={!selectedFile || uploading}>
            Comenzar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
