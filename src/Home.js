import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const images = [
    'images/image1.jpeg', 
    'images/image2.jpeg',
    'images/image3.webp',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home-page">
      <div className="image-collage">
        <img src={images[currentImageIndex]} alt="Game Collage" />
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <address>
          123 Gaming Street<br />
          Cityville, Ontario 12345<br />
          Phone: (123) 456-7890<br />
          Email: info@awesomegame.com
        </address>
      </div>
    </main>
  );
}

export default Home;
