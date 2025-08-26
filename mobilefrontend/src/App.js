import React, { useState } from "react";
import MobileList from "./MobileList";
import PurchaseForm from "./PurchaseForm";

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [titleText, setTitleText] = useState("GetMobiles");

  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
    
    // Special effects based on click count
    if (clickCount === 0) {
      setTitleText("🚀 GetMobiles 🚀");
    } else if (clickCount === 1) {
      setTitleText("⚡ Super GetMobiles ⚡");
    } else if (clickCount === 2) {
      setTitleText("🎮 Gaming GetMobiles 🎮");
    } else if (clickCount === 3) {
      setTitleText("🌟 Ultimate GetMobiles 🌟");
    } else if (clickCount === 4) {
      setTitleText("🔥 Legendary GetMobiles 🔥");
    } else {
      setTitleText("💎 Diamond GetMobiles 💎");
    }

    // Add a temporary class for extra animation
    const title = document.querySelector('h1');
    if (title) {
      title.classList.add('title-clicked');
      setTimeout(() => {
        title.classList.remove('title-clicked');
      }, 500);
    }
  };

  return (
    <div className="App">
      <div className="brand-header">
        <div className="brand-logo">
          <span className="phone-icon">📱</span>
          <span className="brand-text">GetMobiles</span>
        </div>
        <h1 onClick={handleTitleClick} title={`Click me! Clicks: ${clickCount}`}>
          {titleText}
        </h1>
      </div>
      <MobileList />
      <PurchaseForm />
    </div>
  );
}

export default App;