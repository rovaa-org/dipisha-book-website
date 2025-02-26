'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamically import react-pdf with no SSR
const PDFDocument = dynamic(
  () => import('react-pdf').then(mod => ({ default: mod.Document })),
  { ssr: false }
);
const PDFPage = dynamic(
  () => import('react-pdf').then(mod => ({ default: mod.Page })),
  { ssr: false }
);

// Load the worker dynamically on the client side
const loadPdfWorker = () => {
  if (typeof window !== 'undefined') {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
      ).toString();
    });
  }
};

export function PDFViewer({
  pdfUrl,
}: {
  pdfUrl: string,
}) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, setIsLoading] = useState(true);
  const documentRef = useRef<HTMLDivElement>(null);

  // Load PDF.js worker on client side
  useEffect(() => {
    loadPdfWorker();
  }, []);

  // Swipe and key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setPageNumber(prev => Math.min(prev + 1, numPages || prev));
      } else if (e.key === 'ArrowLeft') {
        setPageNumber(prev => Math.max(prev - 1, 1));
      }
    };

    // Swipe detection
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX - touchEndX;

      // Adjust sensitivity as needed
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swiped left, go to next page
          setPageNumber(prev => Math.min(prev + 1, numPages || prev));
        } else {
          // Swiped right, go to previous page
          setPageNumber(prev => Math.max(prev - 1, 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [numPages]);

  // Responsive scale calculation
  const calculateInitialScale = useCallback(() => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      const baseScale = Math.min(
        (screenWidth * 0.95) / 800,
        (screenHeight * 0.95) / 1000
      );
      
      return Math.min(Math.max(baseScale, 1), 1.5);
    }
    return 1;
  }, []);

  // Set initial scale on mount and resize
  useEffect(() => {
    const initialScale = calculateInitialScale();
    setScale(initialScale);

    const handleResize = () => {
      setScale(calculateInitialScale());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateInitialScale]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      documentRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 1));
  };

  return (
    <div ref={documentRef} className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="relative w-full max-w-4xl mx-auto">
        {typeof window !== 'undefined' && (
          <PDFDocument
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setIsLoading(false);
            }}
            loading={
              <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-700"></div>
                  <p className="mt-4 text-pink-700">Loading PDF...</p>
                </div>
              </div>
            }
          >
            <div 
              className="flex justify-center items-center overflow-auto"
              style={{ transform: `scale(${scale})` }}
            >
              <PDFPage
                pageNumber={pageNumber}
                scale={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                canvasBackground="transparent"
              />
            </div>
          </PDFDocument>
        )}

        {/* Floating Control Bar */}
        <div className="fixed bottom-20 sm:bottom-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-2 flex items-center space-x-2">
          {/* Page Navigation */}
          <Button 
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="text-pink-700 hover:bg-pink-50"
            size="sm"
          >
            <ChevronLeft size={18} />
          </Button>

          <span className="text-sm px-2">{pageNumber} / {numPages || '?'}</span>

          <Button 
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
            disabled={pageNumber >= (numPages || 0)}
            className="text-pink-700 hover:bg-pink-50"
            size="sm"
          >
            <ChevronRight size={18} />
          </Button>

          {/* Zoom Controls */}
          <Button 
            onClick={zoomOut}
            disabled={scale <= 1}
            className="text-pink-700 hover:bg-pink-50"
            size="sm"
          >
            <ZoomOut size={18} />
          </Button>

          <Button 
            onClick={zoomIn}
            disabled={scale >= 3}
            className="text-pink-700 hover:bg-pink-50"
            size="sm"
          >
            <ZoomIn size={18} />
          </Button>

          {/* Fullscreen Toggle */}
          <Button 
            onClick={toggleFullscreen}
            className="text-pink-700 hover:bg-pink-50"
            size="sm"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}