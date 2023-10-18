"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Api {
  apiName: string;
  apiUrl: string;
}

export default function Api(props: Api) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make the HTTP GET request when the component mounts
    axios.get(props.apiUrl)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{props.apiName}:</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {error}</p>
          ) : (
            <p className="text-sm text-gray-500">{data}</p>
          )}
        </div>
      </div>
    </div>
  );
}
