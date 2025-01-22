import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useRaffleStore } from '../store/raffleStore';
import Papa from 'papaparse';

export const FileUpload: React.FC = () => {
  const { addParticipant } = useRaffleStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      if (file.type === 'text/csv') {
        Papa.parse(file, {
          complete: (results) => {
            results.data.forEach((row: any) => {
              if (row[0]) {
                addParticipant({
                  username: row[0],
                  weight: 1,
                  timestamp: Date.now(),
                  source: 'manual',
                });
              }
            });
          },
        });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          text.split('\n').forEach((line) => {
            const username = line.trim();
            if (username) {
              addParticipant({
                username,
                weight: 1,
                timestamp: Date.now(),
                source: 'manual',
              });
            }
          });
        };
        reader.readAsText(file);
      }
    });
  }, [addParticipant]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
        <Upload className="mr-2" />
        Import Participants
      </h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-purple-400 bg-purple-400/10' : 'border-gray-600 hover:border-purple-400'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop CSV/TXT files here, or click to select files'}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Supported formats: CSV, TXT
        </p>
      </div>
    </div>
  );
};