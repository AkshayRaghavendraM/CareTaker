import React, { useState } from 'react';

const MedicalTips = () => {
  const videos = [
    { title: 'Health Lessons', url: 'https://www.youtube.com/embed/dZB5DvUysTE?si=brcArpR-Hmk91D8K' },
  ];

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  const handleVideoChange = (video: { title: string; url: string }) => {
    setCurrentVideo(video);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1>Medical Tips</h1>
      <div className="mb-4">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => handleVideoChange(video)}
            className="block w-full p-2 border border-gray-300 rounded mb-2 text-left"
          >
            {video.title}
          </button>
        ))}
      </div>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          width="560"
          height="315"
          src={currentVideo.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MedicalTips;