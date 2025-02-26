// BookDetailsSheet.tsx - Server Component
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Book as BookIcon } from 'lucide-react';
import { Book } from '@/app/types/book';
import Image from 'next/image';

export function BookDetailsSheet({ bookDetails }: { bookDetails: Book }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <BookIcon className="mr-2" size={18} /> Book Details
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