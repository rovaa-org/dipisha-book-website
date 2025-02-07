import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  HelpCircle,
  Book as BookIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Book } from '@/app/types/book';
import Image from 'next/image';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function NavigationBookSheet({ bookDetails }: { bookDetails: Book }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <BookIcon className="mr-2" /> Book Details
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Book Details</SheetTitle>
        </SheetHeader>
        
        {/* Cover Image */}
        <div className="flex justify-center my-4">
          <Image 
            src={bookDetails.coverImage} 
            alt={`Cover of ${bookDetails.title}`} 
            width={200} 
            height={300} 
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Book Info */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{bookDetails.title}</h2>
          <p className="text-muted-foreground">by {bookDetails.author}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mt-2">
            {bookDetails.genre.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm mt-4">{bookDetails.description}</p>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div>
              <strong>Status:</strong>
              <p>{bookDetails.status}</p>
            </div>
            <div>
              <strong>Release Date:</strong>
              <p>{bookDetails.releaseDate}</p>
            </div>
            <div>
              <strong>Pages:</strong>
              <p>{bookDetails.pages}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavigationHelpSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <HelpCircle className="mr-2" /> Navigation Shortcut
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px]">
        <SheetHeader>
          <SheetTitle>Navigation Help</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 mt-4">
          <section>
            <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li>Left Arrow: Previous Page</li>
              <li>Right Arrow: Next Page</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold mb-2">Touch Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li>➡️ Swipe Left: Next Page</li>
              <li>⬅️ Swipe Right: Previous Page</li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PDFViewer({
  pdfUrl,
  bookDetails
}: {
  pdfUrl: string,
  bookDetails: Book
}) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, setIsLoading] = useState(true);
  const documentRef = useRef<HTMLDivElement>(null);

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
      {/* Top Left Buttons */}
      <div className="absolute top-4 left-4 flex space-x-2">
        <NavigationBookSheet bookDetails={bookDetails} />
        <NavigationHelpSheet />
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            setIsLoading(false);
          }}
          loading={
            <div className="flex justify-center items-center h-screen">
              Loading PDF...
            </div>
          }
        >
          <div 
            className="flex justify-center items-center overflow-auto"
            style={{ transform: `scale(${scale})` }}
          >
            <Page
              pageNumber={pageNumber}
              scale={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              canvasBackground="transparent"
            />
          </div>
        </Document>

        {/* Floating Control Bar */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-2 flex items-center space-x-2">
          {/* Page Navigation */}
          <Button 
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="text-[#9D6B6B] hover:bg-white"
          >
            <ChevronLeft />
          </Button>

          <span className="text-sm">{pageNumber} / {numPages || '?'}</span>

          <Button 
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
            disabled={pageNumber >= (numPages || 0)}
            className="text-[#9D6B6B] hover:bg-white"
          >
            <ChevronRight />
          </Button>

          {/* Zoom Controls */}
          <Button 
            onClick={zoomOut}
            disabled={scale <= 1}
            className="text-[#9D6B6B] hover:bg-white"
          >
            <ZoomOut />
          </Button>

          <Button 
            onClick={zoomIn}
            disabled={scale >= 3}
            className="text-[#9D6B6B] hover:bg-white"
          >
            <ZoomIn />
          </Button>

          {/* Fullscreen Toggle */}
          <Button 
            onClick={toggleFullscreen}
            className="text-[#9D6B6B] hover:bg-white"
          >
            {isFullscreen ? <Minimize2 /> : <Maximize2 />}
          </Button>
        </div>
      </div>
    </div>
  );
}