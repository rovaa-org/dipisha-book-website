'use client';

import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  // State management
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Event handlers
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error: Error) {
    setError('Failed to load PDF. Please try again.');
    setIsLoading(false);
    console.error('PDF load error:', error);
  }

  // Navigation functions
  const previousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
  };

  // Zoom functions
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  // Rotation function
  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-6">
        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading PDF...</p>
          </div>
        )}

        {/* PDF Document */}
        <div className="flex flex-col items-center">
          <Document
            file={pdfUrl}
            
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div>Loading PDF...</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className="shadow-lg"
              loading={
                <div className="w-full h-[600px] bg-gray-100 animate-pulse"></div>
              }
            />
          </Document>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={previousPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="mx-2">
                Page {pageNumber} of {numPages || '?'}
              </span>
              
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={pageNumber >= (numPages || 0)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                onClick={zoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="mx-2">
                {Math.round(scale * 100)}%
              </span>
              
              <Button
                variant="outline"
                onClick={zoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Rotation control */}
            <Button
              variant="outline"
              onClick={rotate}
              className="ml-4"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}