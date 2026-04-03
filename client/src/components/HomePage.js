import "./HomePage.css";

function HomePage() {
  return (
    <div>
      {/* TOPBAR */}
      <div className="topbar">
        🎉 Get 40% off your first order — Use code <strong>FIRSTBITE</strong>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="logo">
            🍽️ Bite<span>Rush</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <h1>Hungry? Food is just a tap away</h1>
      </div>
    </div>
  );
}

export default HomePage;
