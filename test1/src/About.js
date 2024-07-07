import React from 'react';
import './About.css'; 
import teamImage from './imageTeam.png'; 

function About() {
  return (
    <main className="about-page">
      <h1>About Us</h1>

      <div className="about-content">
        <div className="team-image">
          <img src={teamImage} alt="Our Team" />
        </div>
        <div className="company-info">
          <h2>Our Company</h2>
          <p>
          Pixel Nexus is a passionate gaming hub founded by gamers, for gamers. In our first year, we've established ourselves as a trusted destination for buying and selling pre-owned gaming products, offering a curated selection of consoles, games, accessories, and collectibles at competitive prices.
But we're more than just a marketplace. We believe in the power of community. That's why we've created a welcoming space where gamers can connect, share experiences, and celebrate their love for gaming. Through online forums, tournaments, and engaging events, we strive to foster a vibrant community that goes beyond transactions.
Whether you're a seasoned pro or just starting your gaming journey, we're here to provide you with quality products, exceptional service, and a sense of belonging. Join us as we continue to build a gaming community that's inclusive, passionate, and always ready for the next adventure.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
