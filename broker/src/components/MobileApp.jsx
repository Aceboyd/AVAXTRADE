import React from 'react';

const YouTubeVideo = () => {
  return (
    <section className="py-10 sm:py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Learn Crypto for Beginners
            <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Watch Now
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-center sm:text-left">
            Discover the basics of cryptocurrency's with this beginner-friendly video. Click play to start learning!
          </p>
        </div>
        <div className="relative max-w-full sm:max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1 rounded-2xl sm:rounded-3xl">
            <div className="bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/zJBef4i57zU"
                  title="Crypto for Beginners Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  aria-label="Crypto for Beginners YouTube video"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideo;