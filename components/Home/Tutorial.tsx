import React from 'react';
import Heading from '../Heading';

const Tutorial = () => {
  return (
    <div id="tutorial" className="bg-purple-40 py-10 md:py-12 mb-sm-section-gap md:mb-section-gap">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center md:mb-8">
          <Heading title="Let's Learn How We Work" center />
        </header>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <div className="md:w-1/2 pl-4 mt-6 md:mt-0">
            <div className="aspect-w-16 aspect-h-9">
            <iframe className="w-full md:h-72"  src="https://www.youtube.com/embed/faTBdFBZTR4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
