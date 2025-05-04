import { useState } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/gallery/Gallery";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <nav className="navbar">
        <h1>NelPinterest</h1>
        <button onClick={() => navigate("/home")} className="cta-button">
          Get Started
        </button>
      </nav>

      <header className="hero">
        <h2>Discover, Collect & Share Ideas with NelPinterest</h2>
        <p>Join millions exploring creativity and inspiration.</p>
        <button onClick={() => navigate("/auth")} className="cta-button">
          Join Now
        </button>
      </header>

      <Gallery />
      <footer className="footer">
        <p>© {new Date().getFullYear()} NelPinterest. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
