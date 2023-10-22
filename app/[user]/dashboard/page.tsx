"use client"
import React, { useState } from 'react';
import FileUpload from '@/components/fileUpload/fileUploadComponent';
import { Suspense } from "react"
import TablePlaceholder from "@/components/table-placeholder"
import Api from '@/components/api'
import OpenAiApi from '@/components/openAiApi'

export default function Home() {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedTextContent, setSelectedTextContent] = useState<string | null>(null);
  const [api1Data, setApi1Data] = useState(null);

  const handleFileSelect = (fileName: string | null, textContent: string) => {
    setSelectedFileName(fileName);
    setSelectedTextContent(textContent);
  };

  const api1Props = {
    apiName: 'Interpretando el texto',
    apiUrl: '/api/utils/ocrApi',
    queryParameters: {
      name: selectedFileName,
      lang: 'spa',
    },
  };

  const api2Props = {
    apiName: 'Respuesta de IntiText AI',
    apiUrl: '/api/utils/openAi',
    queryParameters: {
      text: api1Data,
      prompt: selectedTextContent,
    },
  };
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
        {!selectedFileName && <Suspense fallback={<TablePlaceholder />}>
          <FileUpload setFileLoaded={setFileLoaded} onFileSelect={handleFileSelect} />
        </Suspense>}
        {selectedFileName && !api1Data && <Suspense fallback={<TablePlaceholder />}>
          <Api {...api1Props} onDataReceived={setApi1Data} />
        </Suspense>}
        {api1Data && <Suspense fallback={<TablePlaceholder />}>
          <OpenAiApi {...api2Props} />
        </Suspense>}
    </main>
  )
}
