"use client"
import React, { useState } from 'react';
import FileUpload from '@/components/fileUpload/fileUploadComponent';
import { Suspense } from "react"
import TablePlaceholder from "@/components/table-placeholder"
import Api from '@/components/api'

export default function Home() {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [api1Data, setApi1Data] = useState(null);

  const handleFileSelect = (filename: string | null) => {
    setSelectedFileName(filename);
  };

  const api1Props = {
    apiName: 'ocrApi',
    apiUrl: '/api/utils/ocrApi',
    queryParameters: {
      name: selectedFileName,
      lang: 'spa',
    },
  };

  const api2Props = {
    apiName: 'Resumen del contenido',
    apiUrl: '/api/utils/openAi',
    queryParameters: {
      prompt: 'do a resume of the next info: ' + api1Data,
    },
  };
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
        {!selectedFileName && <Suspense fallback={<TablePlaceholder />}>
          <FileUpload setFileLoaded={setFileLoaded} onFileSelect={handleFileSelect} />
          {fileLoaded && selectedFileName && (
            <p>Selected File: {selectedFileName}</p>
          )}
        </Suspense>}
        {selectedFileName && !api1Data && <Suspense fallback={<TablePlaceholder />}>
          <Api key={1} {...api1Props} onDataReceived={setApi1Data} />
        </Suspense>}
        {api1Data && <Suspense fallback={<TablePlaceholder />}>
          <Api key={2} {...api2Props} />
        </Suspense>}
    </main>
  )
}
