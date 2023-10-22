"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
import ExpandingArrow from '@/components/expanding-arrow'

interface Api {
  apiName: string;
  apiUrl: string;
  queryParameters?: object; // Define the query parameters as an object
  onDataReceived?: (data: any) => void; // Callback function for receiving data
}

export default function OpenAiApi(props: Api) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make the HTTP GET request when the component mounts
    axios.get(props.apiUrl, {
      params: props.queryParameters, // Pass query parameters as an object
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
        if (props.onDataReceived) {
          props.onDataReceived(response.data); // Call the callback function with data
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      });
  }, [props.apiUrl, props.queryParameters]); // Include props in the dependency array to update the request when they change

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{props.apiName}:</h2>
          <br />
          {loading ? (
            <p className="text-sm text-gray-500">Cargando...</p>
          ) : error ? (
            <div>
              <p className="text-sm text-red-500">Error: El texto excede la cantidad de carcateres que pueden procesarse por el sistema</p>
              <Link
                  href="javascript:window.location.href=window.location.href"
                  className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-20 py-4 hover:shadow-lg active:shadow-sm transition-all"
                >
                  <p>Comienza de nuevo</p>
                  <ExpandingArrow />
                </Link>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">{data}</p>
              <br />
              <Link
                href="javascript:window.location.href=window.location.href"
                className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-20 py-4 hover:shadow-lg active:shadow-sm transition-all"
              >
                <p>Comienza de nuevo</p>
                <ExpandingArrow />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}