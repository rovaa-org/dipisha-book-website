import React from "react";

const HeroShowcase = () => {
  return (
    <div className="relative w-full h-screen" id="home">
      <div className="absolute inset-0">
        {/* Mobile-first approach with responsive video sources */}
        <div className="hidden md:block">
          {/* Desktop video (16:9 ratio) - only loads on md screens and above */}
          <video
            className="absolute top-0 left-0 min-w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/sister-poster.jpg" // Optional: Add a poster image
          >
            <source src="/sister.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="block md:hidden">
          {/* Mobile video - only loads on screens smaller than md breakpoint */}
          <video
            className="absolute top-0 left-0 min-w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/sister-mobile-poster.jpg" // Optional: Add a poster image
          >
            <source src="/sister-mobile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 grid grid-cols-12 h-full container mx-auto px-4">
        {/* Text content - making more responsive for mobile */}
        <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-6 flex flex-col justify-center">
          <h1 className="space-y-6">
            <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-pink-50 font-bold leading-tight font-crafty-girls">
              I&apos;ve stories yet to tell and life yet to live
            </span>
          </h1>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-pink-300 to-pink-400 my-6 md:my-10" />
          <p className="text-base sm:text-lg md:text-xl text-pink-100 font-serif italic leading-relaxed max-w-2xl font-geist-sans">
            Welcome to my literary world. My name is Dipisha Kalura, I am storyteller this is places where I share my stories with you all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
