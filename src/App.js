import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import Articles from './Articles';
import Browse from './Browse';
import Tutorials from './Tutorials';
import Forums from './Forums';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar /> 
        <div className="content-wrapper">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/forums" element={<Forums />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
