'use client'

import React from 'react';

const HeroShowcase = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Video Background with overlay */}
      <div className="absolute inset-0">
        <video
          className="absolute top-0 left-0 min-w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/sister.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 grid grid-cols-12 h-full container mx-auto px-4">
        {/* Text content */}
        <div className="col-start-3 col-span-6 flex flex-col justify-center">
          <h1 className="space-y-6">
            <span className="block text-3xl md:text-5xl lg:text-6xl font-serif text-pink-50 font-bold leading-tight">
              I&apos;ve stories yet to tell and lives yet to live
            </span>
          </h1>
          
          <div className="w-32 h-1 bg-gradient-to-r from-pink-300 to-pink-400 my-10" />
          
          <p className="text-lg md:text-xl text-pink-100 font-serif italic leading-relaxed max-w-2xl">
            Welcome to my literary world. My name is Dipisha Kalura, I am author and storyteller this is places where I share all my books with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;